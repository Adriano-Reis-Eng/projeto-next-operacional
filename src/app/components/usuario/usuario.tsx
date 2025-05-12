'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputBtn from "../inputBtn/InputBtn";
import Cookies from "js-cookie";
import styles from "./usuario.module.css"
import { payloadToken } from "@/utils/jwt";

export default function Usuario() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            const user = payloadToken(token)
            setMessage(user?.nome || "")
        }
    }, []);

    async function handleLogout() {
        setLoading(true);
        Cookies.remove("token");
        await fetch("/api/logout");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        router.push("/");
    }

    return (
        <>
            <div className={styles.nomeUsuario}>
                {message && <p className={styles.successMsg}>{message}</p>}
                <div className={styles.button}>
                    <InputBtn type="submit" onClick={handleLogout} disabled={loading}>
                        {loading ? "Saindo..." : "Sair"}
                    </InputBtn>
                </div>
            </div>
        </>
    )
}