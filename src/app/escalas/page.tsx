'use client'
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./Escalas.module.css";
import Usuario from "../components/usuario/usuario";
import BackBtn from "../components/backBtn/BackBtn";

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
    const [lista, setLista] = useState<Escala[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setMessage('Buscando...');
            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        funcao: "GetData",
                        token: Cookies.get("token"),
                        sheet: "Macope",
                        data: {
                            cracha: sessionStorage.getItem('cracha')
                        }
                    })
                });
                const result = await response.json();
                if (result.success == false) {
                    setMessage('Sem escala programada.');
                }
                else if (result.success == true) {
                    setLista(result.message);
                    setMessage("");
                }
            } catch {
                setMessage("Erro ao conectar com o servidor.");
            }
        };

        fetchData();
    }, []);


    return (
        <main className={styles.main}>
            <section className={styles.containerUser}>
                <Usuario />
            </section>
            <section className={styles.containerBtn}>
                <BackBtn />
            </section>
            <section className={styles.containerLista}>
                {message && <p className={styles.successMsg}>{message}</p>}
                <h1>Escala programada</h1>
                <div className={styles.tabelaContainer}>
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Linha:</th>
                                <th>Início 2º/6:</th>
                                <th>Fim 2º/6º:</th>
                                <th>Suplementar 2º/6º:</th>
                                <th>Início Sábado:</th>
                                <th>Fim Sábado</th>
                                <th>Suplementar Sábado</th>
                                <th>Início Domingo</th>
                                <th>Fim Domingo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((item, index) => (
                                <tr key={index}>
                                    <td data-label="Escala:">{item.idEscala}</td>
                                    <td data-label="Início 2º/6º:">{item.semanainicio}</td>
                                    <td data-label="Fim 2º/6º:">{item.semanafim}</td>
                                    <td data-label="Suplementar 2º/6º:">{item.suplementarDU}</td>
                                    <td data-label="Inicio Sábado:">{item.sabadoinicio}</td>
                                    <td data-label="Fim Sábado:">{item.semanafim}</td>
                                    <td data-label="Suplementar Sábado:">{item.suplementarS}</td>
                                    <td data-label="Início Domingo:">{item.domingoinicio}</td>
                                    <td data-label="Fim Domingo">{item.domingofim}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
} 