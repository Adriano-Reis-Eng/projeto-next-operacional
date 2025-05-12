'use client'
import { useState, useEffect } from "react";
import { payloadToken } from "../../utils/jwt";
import Cookies from "js-cookie";
//import InputBtn from "../components/inputBtn/InputBtn";
import styles from "./Escalas.module.css"
import BackBtn from "../components/backBtn/BackBtn";
//import Usuario from "../components/usuario/usuario";
//import AvisoForm from "../cadastro/AvisoForm";

interface Escala {
    idEscala: string;
    semanainicio: string;
    semanafim: string;
    sabadoinicio: string;
    sabadofim: string;
    domingoinicio: string;
    domingofim: string;
    suplementarDU: string;
    suplementarS: string;
}

export default function EscalaPage() {
    const [message, setMessage] = useState("");
    const [cracha, setCracha] = useState("");
    const [nome, setNome] = useState("");
    const [escala, setEscala] = useState<Escala[]>([]);
    //const [loading, setLoading] = useState(false);
    const [erro, setError] = useState<string | null>(null);    

    useEffect(() => {
        const fetchData = async () => {
            setMessage('Buscando...');
            const token = Cookies.get("token");
            let func = "";
            if (token) {
                const user = payloadToken(token);
                func = user?.cracha || "";
                if (user?.cracha) {
                    setCracha(user.cracha);
                }
                if (user?.nome) {
                    setNome(user.nome);
                }
            }

            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        funcao: "ListaFerias",
                        token: Cookies.get("token"),
                        sheet: "macope",
                        data: {
                            cracha: func
                        }
                    })
                });
                const result = await response.json();
                if (result.success == false) {
                    setMessage('Sem periodo de férias programado.');
                }
                else if (result.success == true) {
                    setEscala(result.message);
                    setMessage("");
                }
            } catch {
                setMessage("Erro ao conectar com o servidor.");
                setError("")
            }
        };

        fetchData();
    }, []);    

    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault();
    //     const token = Cookies.get("token");
    //     const valdToken = validToken(token || "")
    //     if (valdToken === true) {
    //         setLoading(true);
    //         setError("");
    //         try {

    //             const response = await fetch("/api/login", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({
    //                     funcao: "Escala",
    //                     token: sessionStorage.getItem("token"),
    //                     data: {
    //                         cracha,
    //                         tipoEscala
    //                     }
    //                 })
    //             })
    //             const result = await response.json();
    //             console.log(result)
    //             if (result.success == false) {
    //                 setDiaSemana("Sem escala programada.");
    //                 setEscala([result]);
    //             }
    //             else if (result.success == true) {
    //                 setEscala([result.message]);
    //                 setDiaSemana(result.message.dia || "");
    //                 setError("");
    //             }
    //         } catch {
    //             setError("Erro ao conectar com o servidor.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     else {
    //         setLoading(false);
    //     }
    // }
    return (
        <main className={styles.main}>
            <div className={styles.containerUser}>                
                <section className={styles.containerBtn}>
                    <BackBtn />
                </section>
                {erro ? (
                    <p className={styles.errorMsg}>{erro}</p>
                ) : (
                    <h2 className={styles.usuario}>{nome}<br /> {cracha}</h2>
                )}
            </div>
            <div className={styles.content}>
                {message && <p className={styles.successMsg}>{message}</p>}
                {escala.length > 0 && (

                    <div className={styles.cardContainer}>
                        <h2>Escala:</h2>
                        {escala.map((item, idx) => (
                            <div className={styles.card} key={idx}>
                                <p>Escala: {item.idEscala}</p>
                                <p>Início (Semana): {item.semanainicio}</p>
                                <p>Final (Semana): {item.semanafim}</p>
                                <p>Início (Sábado): {item.sabadoinicio}</p>
                                <p>Final (Sábado): {item.sabadofim}</p>
                                <p>Início (Domingo) {item.sabadoinicio}</p>
                                <p>Final (Domingo): {item.domingofim}</p>
                                <p>Suplementar 2º/6º:{item.suplementarDU}</p>
                                <p>Suplementar Sábado: {item.suplementarS}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
} 