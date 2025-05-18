'use client'
import { useState } from "react";
import Cookies from "js-cookie";
import styles from "./relatorios.module.css";
import InputBtn from "../components/inputBtn/InputBtn";

export default function Relatorios() {
    const [folga, setfolga] = useState("");
    const [cracha, setCracha] = useState("");
    const [nome, setNome] = useState("");
    const [trabalha, setTrabalha] = useState("");
    const [folgatroca, setFolgaTroca] = useState("");
    const [crachatroca, setCrachaTroca] = useState("");
    const [nometroca, setNomeTroca] = useState("");
    const [trabalhadiaroca, setTrabalhaTroca] = useState("");
    const [confirmado, setConfirmado] = useState("");    
    const [loading, setLoading] = useState(false);
    const [erro, setError] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcao: "CreateData",
                    token: Cookies.get('token'),
                    sheet: "TrocaDeServico",
                    data: {
                        folga,
                        cracha,
                        nome,
                        trabalha,
                        folgatroca,
                        crachatroca,
                        nometroca,
                        trabalhadiaroca,
                        confirmado: confirmado
                    },
                }),
            });

            const result = await response.json();
            if (result.success == false) {
                setError(result.message);
                setMessage("")
            }
            else if (result.success == true) {
                setMessage(result.message);
                setError("");
            }
        } catch {
            setError("Erro ao conectar com o servidor.");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <main className={styles.main}>
                <section className={styles.container}>
                    <form onSubmit={handleSubmit} className={styles.cadForm}>
                        <h1 className={styles.title}>Troca de serviço</h1>
                        <div className={styles.formGroup}>                            
                            <label className={styles.label}>Folga</label>
                            <input
                                type="text"
                                autoComplete="off"
                                required
                                value={folga}
                                onChange={e => setfolga(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Crachá</label>
                            <input                                
                                type="text"
                                autoComplete="off"
                                required
                                value={cracha}
                                onChange={e => setCracha(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nome</label>
                            <input                                
                                type="text"
                                autoComplete="off"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Trabalha dia</label>
                            <input                                
                                type="text"
                                required
                                autoComplete="off"
                                value={trabalha}
                                onChange={e => setTrabalha(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div> 
                        <div className={styles.formGroup}>                            
                            <label className={styles.label}>Folga</label>
                            <input
                                type="text"
                                autoComplete="off"
                                required
                                value={folgatroca}
                                onChange={e => setFolgaTroca(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Crachá</label>
                            <input                                
                                type="text"
                                autoComplete="off"
                                required
                                value={crachatroca}
                                onChange={e => setCrachaTroca(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nome</label>
                            <input                                
                                type="text"
                                autoComplete="off"
                                value={nometroca}
                                onChange={e => setNomeTroca(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Trabalha dia</label>
                            <input                                
                                type="text"
                                required
                                autoComplete="off"
                                value={trabalhadiaroca}
                                onChange={e => setTrabalhaTroca(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div>                                
                        
                        <div className={styles.buttonWrapper}>
                            <InputBtn type="submit" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Enviando..." : "Enviar"}
                            </InputBtn>
                        </div>
                        {erro && <p className={styles.errorMsg}>{erro}</p>}
                        {message && <p className={styles.successMsg}>{message}</p>}
                    </form>
                </section>
            </main>
        </>
    )
}
