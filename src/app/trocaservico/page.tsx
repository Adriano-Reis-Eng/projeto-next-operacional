'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./relatorios.module.css";
import InputBtn from "../components/inputBtn/InputBtn";
import BackBtn from "../components/backBtn/BackBtn";
import Usuario from "../components/usuario/usuario";

export default function TrocaServico() {
    const [folga, setfolga] = useState("G1");
    const [cracha, setCracha] = useState("");
    const [nome, setNome] = useState("");
    const [trabalhadia, setTrabalha] = useState("");
    const [folgatroca, setFolgaTroca] = useState("G2");
    const [crachatroca, setCrachaTroca] = useState("");
    const [nometroca, setNomeTroca] = useState("");
    const [trabalhadiatroca, setTrabalhatroca] = useState("");
    const [confirmado, setConfirmado] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setError] = useState("");
    const [message, setMessage] = useState("");
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");    

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch('/api/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcao: "CreateData",
                    sheet: "TrocaServico",
                    token: Cookies.get('token'),
                    data: {
                        folga,
                        cracha,
                        nome,
                        trabalhadia,
                        folgatroca,
                        crachatroca,
                        nometroca,
                        trabalhadiatroca,   
                        confirmado,                     
                    },
                }),
            });            
            const result = await response.json();
            console.log('teste', result)
            if (result.success == false) {
                setError(result.message);
                setMessage("")
            }
            else if (result.success == true) {
                setMessage(result.message); 
                setConfirmado("")               
                setError("");
            }
        } catch {
            setError("Erro ao conectar com o servidor.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // 0-based

        // Primeiro dia do mês
        const firstDay = new Date(year, month, 1);
        // Último dia do mês
        const lastDay = new Date(year, month + 1, 0);

        // Formatando como yyyy-mm-dd
        const formatDate = (date: Date): string => date.toISOString().split("T")[0];

        setMinDate(formatDate(firstDay));
        setMaxDate(formatDate(lastDay));
    }, []);

    return (
        <>
            <main className={styles.main}>
                <section className={styles.containerUser}>
                    <Usuario />
                </section>
                <section className={styles.containerBtn}>
                    <BackBtn />
                </section>
                <section className={styles.container}>
                    <form onSubmit={handleSubmit} className={styles.cadForm}>
                        <h1 className={styles.title}>Troca de serviço</h1>
                        <div className={styles.containerTroca1}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Folga</label>
                                <select
                                    className={styles.select}
                                    required
                                    value={folga}
                                    onChange={e => setfolga(e.target.value)}>
                                    <option value="G1">G1</option>
                                    <option value="G2">G2</option>
                                    <option value="D1">D1</option>
                                    <option value="D2">D2</option>
                                    <option value="D3">D3</option>
                                    <option value="D4">D4</option>
                                    <option value="D5">D5</option>
                                </select>
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
                                    required
                                    autoComplete="off"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    className={styles.input}>
                                </input>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Trabalha dia</label>
                                <input
                                    type="date"
                                    required
                                    autoComplete="off"
                                    value={trabalhadia}
                                    onChange={e => setTrabalha(e.target.value)}
                                    className={styles.input}
                                    min={minDate}
                                    max={maxDate}>
                                </input>
                            </div>
                        </div>

                        <div className={styles.contanierTroca2}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Folga:</label>
                                <select
                                    className={styles.select}
                                    required
                                    value={folgatroca}
                                    onChange={e => setFolgaTroca(e.target.value)}>
                                    <option value="G1">G1</option>
                                    <option value="G2">G2</option>
                                    <option value="D1">D1</option>
                                    <option value="D2">D2</option>
                                    <option value="D3">D3</option>
                                    <option value="D4">D4</option>
                                    <option value="D5">D5</option>
                                </select>
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
                                    required
                                    autoComplete="off"
                                    value={nometroca}
                                    onChange={e => setNomeTroca(e.target.value)}
                                    className={styles.input}>
                                </input>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Trabalha dia</label>
                                <input
                                    type="date"
                                    required
                                    autoComplete="off"
                                    value={trabalhadiatroca}
                                    onChange={e => setTrabalhatroca(e.target.value)}
                                    className={styles.input}
                                    min={minDate}
                                    max={maxDate}>
                                </input>
                            </div>
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
