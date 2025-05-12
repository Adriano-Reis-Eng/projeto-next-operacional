"use client";
import React from "react";
import { useState, useEffect } from "react";
import { validToken, payloadToken } from "../../utils/jwt";
//import ListaOperacao from "./OperacaoForm";
import styles from "./OperacaoPage.module.css";

export default function LoginPage() {
    const [erro, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (token && validToken(token)) {
            const payload = payloadToken(token);
            if (payload?.nome) {
                setMessage(payload.nome);
            }
            if (payload?.cargo) {
                sessionStorage.setItem("cargo", payload.cargo);
            }
        } else {
            setError("Necessário fazer o login.");
        }
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.aviso}>
                {erro && <p className={styles.errorMsg}>{erro}</p>}
                {message && <p className={styles.successMsg}>{message}</p>}
            </div>
            <div className={styles.container}>
                {/* <ListaOperacao /> */}
            </div>
        </main>
    );
} 