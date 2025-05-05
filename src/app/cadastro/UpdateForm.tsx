'use client'
import { useState } from "react";
import styles from "./UpdateForm.module.css";
import InputBtn from "../components/InputBtn";

export default function Update() {
    const [cracha, setCracha] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    const [setor, setSetor] = useState("");
    const [senha, setSenha] = useState("");
    const [escala, setEscala] = useState("ESC-000");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [crachaBusca, setCrachaBusca] = useState("");
    const [buscando, setBuscando] = useState(false);

    async function handleBuscarUsuario(e: React.FormEvent) {
        e.preventDefault();
        setBuscando(true);
        setError("");
        setMessage("");

        if (crachaBusca === '914737' || crachaBusca === '22508' || crachaBusca === '25690') {
            setMessage('Este crachá não pode ser alterado.');
            setBuscando(false);
            return;
        }

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
            if (result.success === false || !user) {
                setError(result.message || "Usuário não encontrado.");
                setMessage("");
            } else {
                setError("");
                setMessage("Usuário encontrado!");
                setCracha(user.cracha || "");
                setNome(user.nome || "");
                setTelefone(user.telefone || "");
                setEmail(user.email || "");
                setCargo(user.cargo || "");
                setSetor(user.setor || "");
                setSenha(user.senha || "");
                setEscala(user.escala || "");
            }
        } catch (error) {
            setError("Erro ao buscar usuário.");
        } finally {
            setBuscando(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (cracha === '914737' || cracha === '22508' || cracha === '25690') {
            setMessage('Este crachá não pode ser alterado.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcao: "updateUser",
                    sheet: "usuarios",
                    token: sessionStorage.getItem('token'),
                    data: {
                        cracha: cracha,
                        nome: nome,
                        telefone: telefone,
                        email: email,
                        cargo: cargo,
                        setor: setor,
                        senha: senha,
                        escala: escala
                    },
                }),
            });
            const result = await response.json();
            if (result.success === false) {
                setError(result.message);
                setMessage("");
            } else {
                setMessage(result.message);
                setError("");
            }
        } catch (error) {
            setError("Erro ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form className={styles.cadForm}>
                <div className={styles.formGroup}>
                    <h1 className={styles.title}>Atualizar cadastro</h1>
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
                <div className={styles.buttonWrapper}>
                    <InputBtn type="submit" onClick={handleBuscarUsuario} disabled={buscando}>
                        {buscando ? "Buscar..." : "Buscar"}
                    </InputBtn>
                </div>
            </form>

            <form className={styles.cadForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="cracha" className={styles.label}>Crachá:</label>
                    <input
                        id="cracha"
                        name="cracha"
                        type="text"
                        autoComplete="off"
                        required
                        value={cracha}
                        onChange={e => setCracha(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="nome" className={styles.label}>Nome:</label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        autoComplete="off"
                        required
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className={styles.input}
                    />
                </div>
                {/* ...continue os demais campos normalmente... */}
            </form>
        </>
    );
}
