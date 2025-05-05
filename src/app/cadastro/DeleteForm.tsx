"use client";
import { useState } from "react";
import React from "react";
import styles from "./DeleteForm.module.css"

export default function DeleteForm() {
    const [erro, setError] = useState("");
    const [message, setMessage] = useState("");    
    const [crachaBusca, setCrachaBusca] = useState("");
    const [buscando, setBuscando] = useState(false);
    const [apagando, setApagando] = useState(false);
    const [cracha, setCracha] = useState("");
    const [nome, setNome] = useState("");

    async function handleBuscarUsuario(e: React.FormEvent) {
        e.preventDefault();
        setBuscando(true);
        setError("");
        setMessage("");        
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcao: "getUser",
                    token: sessionStorage.getItem('token'),
                    data: {
                        cracha: crachaBusca
                    },
                }),
            });
            const result = await response.json();
            const user = result.message[0];           
            if (result.success === false) {
                setError(result.message || "Usuário não encontrado.");
                setMessage("");
            } else if (result.success === true) {
                setError("");
                setMessage("Usuário encontrado!");
                setCrachaBusca(user.cracha || "");
                setCracha(user.cracha || "");
                setNome(user.nome || "");
            }
        } catch (error) {
            setError("Erro ao buscar usuário.");
        } finally {
            setApagando(false);
            setBuscando(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();        
        setError("");        
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcao: "deleteUser",
                    sheet: 'usuarios',
                    token: sessionStorage.getItem('token'),
                    data: {
                        cracha: crachaBusca
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
        } catch (error) {
            setError("Erro ao conectar com o servidor.");
        }        
    }

    return (
        <>
            {/* Formulário de busca de usuário */}
            <form onSubmit={handleBuscarUsuario} className={styles.cadForm}>
                <div className={styles.formGroup}>
                    <h1 className={styles.title}>Apagar cadastro</h1>
                    <label htmlFor="crachaBusca" className={styles.label}>Buscar por Crachá:</label>
                    <input
                        id="crachaBusca"
                        name="crachaBusca"
                        type="text"
                        autoComplete="off"
                        required
                        value={crachaBusca}
                        onChange={e => setCrachaBusca(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button
                    type="submit"
                    disabled={buscando}
                    className={styles.submitBtn}>
                    {buscando ? "Buscando..." : "Buscar"}
                </button>
                {erro && <p className={styles.errorMsg}>{erro}</p>}
                {message && <p className={styles.successMsg}>{message}</p>}
            </form>
            <form onSubmit={handleSubmit} className={styles.delForm}>
                <div className={styles.formGroup}>
                    <h2 className={styles.label}>Crachá: {cracha}</h2>
                    <h1 className={styles.label}>Nome: {nome}</h1>
                    <button
                        type="submit"
                        disabled={apagando}
                        className={styles.deleteBtn}>
                        {apagando ? "Apagando..." : "Apagar"}
                    </button>
                </div>
            </form>
        </>
    );
} 