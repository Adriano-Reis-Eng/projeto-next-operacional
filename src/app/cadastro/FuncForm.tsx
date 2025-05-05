"use client";
import { useState } from "react";
import React from "react";
import styles from "./FuncForm.module.css"

interface Funcionarios {
    cracha: string;
    nome: string;
    telefone: string;
    email: string;
    cargo: string;
    setor: string;
}

export default function DeleteForm() {
    const [erro, setError] = useState("");
    const [message, setMessage] = useState("");
    const [crachaBusca, setCrachaBusca] = useState("");
    const [buscando, setBuscando] = useState(false);
    const [funcionario, setFuncionarios] = useState<Funcionarios[]>([]);    

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
            if (result.success === false) {
                setError(result.message || "Usuário não encontrado.");
                setMessage("");
            } else if (result.success === true) {
                setFuncionarios(result.message);
                setMessage("Funcionário encontrado.");
            }
        } catch (error) {
            setError("Erro ao buscar usuário.");
        } finally {
            setBuscando(false);
        }
    }    
    return (
        <>
            {/* Formulário de busca de usuário */}
            <form onSubmit={handleBuscarUsuario} className={styles.cadForm}>
                <div className={styles.formGroup}>
                    <h1 className={styles.title}>Busca funcionário</h1>
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
                {funcionario.length > 0 && (
                    <div className={styles.resultado}>
                        <table className={styles.tabelaEscala}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Crachá</th>
                                    <th>Telefone</th>
                                    <th>E-mail</th>
                                    <th>Cargo</th>
                                    <th>Setor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {funcionario.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.nome}</td>
                                        <td>{item.cracha}</td>
                                        <td>{item.telefone}</td>
                                        <td>{item.email}</td>
                                        <td>{item.cargo}</td>
                                        <td>{item.setor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                )}
                {erro && <p className={styles.errorMsg}>{erro}</p>}
                {message && <p className={styles.successMsg}>{message}</p>}
            </form>
        </>
    );
} 