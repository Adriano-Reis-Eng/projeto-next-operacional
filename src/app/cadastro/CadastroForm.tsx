'use client'
import { useState } from "react";
import styles from "./CadastroForm.module.css";
import InputBtn from "../components/InputBtn";

export default function Cadastro() {
    const [cracha, setCracha] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    const [setor, setSetor] = useState("");
    const [senha, setSenha] = useState("");
    const [escala, setEscala] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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
                    funcao: "createUser",
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
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.cadForm}>
                <div className={styles.formGroup}>
                    <h1 className={styles.title}>Cadastrar</h1>
                    <label htmlFor="cracha" className={styles.label}>Crachá:</label>
                    <input
                        id="cracha"
                        name="cracha"
                        type="text"
                        autoComplete="off"
                        required
                        value={cracha}
                        onChange={e => setCracha(e.target.value)}
                        className={styles.input}>
                    </input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cracha" className={styles.label}>Nome:</label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        autoComplete="off"
                        required
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className={styles.input}>
                    </input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="telefone" className={styles.label}>Telefone</label>
                    <input
                        id="telefone"
                        name="telefone"
                        type="text"
                        autoComplete="off"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        className={styles.input}>
                    </input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="off"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.input}>
                    </input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cargo" className={styles.label}>Cargo</label>
                    <select
                        className={styles.select}
                        id="cargo"
                        name="cargo"
                        required
                        value={cargo}                        
                        onChange={e => setCargo(e.target.value)}>
                        <option value="Administrador">Administrador</option>
                        <option value="Encarregado">Encarregado</option>
                        <option value="Motorista">Motorista</option>
                        <option value="Cobrador">Cobrador</option>                                                                     
                    </select>   
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="setor" className={styles.label}>Setor</label>
                    <select
                        className={styles.select}
                        id="setor"
                        name="setor"
                        required
                        value={setor}                        
                        onChange={e => setSetor(e.target.value)}>
                        <option value="Gama">Gama</option>
                        <option value="Paranoá">Paranoá</option>
                        <option value="Santa Maria">Santa Maria</option>
                        <option value="São Sebastião">São Sebastião</option>                                                                     
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="senha" className={styles.label}>Senha</label>
                    <input
                        id="senha"
                        name="senha"
                        type="text"
                        autoComplete="off"
                        required
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        className={styles.input}>
                    </input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="escala" className={styles.label}>Escala</label>
                    <select
                        className={styles.select}
                        id="escala"
                        name="escala"
                        required
                        value={escala}                        
                        onChange={e => setEscala(e.target.value)}>
                        <option value="ESC-002">ESC-002</option>
                        <option value="ESC-003">ESC-003</option>
                        <option value="ESC-004">ESC-004</option>
                        <option value="ESC-005">ESC-005</option>
                        <option value="ESC-006">ESC-006</option>
                        <option value="ESC-007">ESC-007</option>
                        <option value="ESC-008">ESC-008</option>
                        <option value="ESC-009">ESC-009</option>
                        <option value="ESC-010">ESC-010</option>                                                
                    </select>         
                </div>
                <div className={styles.buttonWrapper}>
                    <InputBtn type="submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Enviando..." : "Enviar"}
                    </InputBtn>
                </div>                
                {error && <p className={styles.errorMsg}>{error}</p>}
                {message && <p className={styles.successMsg}>{message}</p>}
            </form>
        </>
    )
}
