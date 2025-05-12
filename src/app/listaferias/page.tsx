'use client';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./listaferias.module.css";
import Usuario from "../components/usuario/usuario";
import { payloadToken } from "@/utils/jwt";
//import { useRouter } from "next/navigation";
import BackBtn from "../components/backBtn/BackBtn";

interface ListaFeriasProps {
    setor: string;
    cracha: string;
    nome: string;
    funcao: string;
    gozoinicio: string;
    gozofim: string;
}

export default function ListaFerias() {
    const [message, setMessage] = useState("");    
    const [lista, setLista] = useState<ListaFeriasProps[]>([]);    

    useEffect(() => {
        const fetchData = async () => {
            setMessage('Buscando...');
            const token = Cookies.get("token");
            let func = "";
            if (token) {
                const user = payloadToken(token);
                func = user?.cracha || "";
            }

            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        funcao: "ListaFerias",
                        token: Cookies.get("token"),
                        sheet: "listaFerias",
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
                <h1>Periodo de Férias</h1>
                <div className={styles.tabelaContainer}>
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Setor</th>
                                <th>Crachá</th>
                                <th>Nome</th>
                                <th>Função</th>
                                <th>Gozo Início</th>
                                <th>Gozo Fim</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((item, index) => (
                                <tr key={index}>
                                    <td data-label="Setor">{item.setor}</td>
                                    <td data-label="Crachá">{item.cracha}</td>
                                    <td data-label="Nome">{item.nome}</td>
                                    <td data-label="Função">{item.funcao}</td>
                                    <td data-label="Gozo Início">{item.gozoinicio}</td>
                                    <td data-label="Gozo Fim">{item.gozofim}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}