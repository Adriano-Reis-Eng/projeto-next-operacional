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
        if (cracha === '914737' || cracha === '22508' || cracha === '25690') {
            setMessage('Este crachá não pode ser alterado.')
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
            if (result.success === false) {
                setError(result.message || "Usuário não encontrado.");
                setMessage("");
            } else if (result.success === true) {
                setError("");
                setMessage("Usuário encontrado!");
                setCracha(user.cracha || "");
                setNome(user.nome || "");
                setTelefone(user.telefone || "");
                setEmail(user.email || "");
                setCargo(user.cargo || "");
                setSetor(user.setor || "");
                setSenha(user.senha);
                setEscala(user.escala || "");
            }
        } catch {
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
            setMessage('Este crachá não pode ser alterado.')
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
            {/* Formulário de busca de usuário */}
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

            {/* Formulário de atualização */}
            <form className={styles.cadForm}>
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
                        className={styles.input}>
                    </input>
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
                        type="text"
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
                        {loading ? "Enviando..." : "Alterar"}
                    </InputBtn>
                </div>
                {error && <p className={styles.errorMsg}>{error}</p>}
                {message && <p className={styles.successMsg}>{message}</p>}
            </form>
        </>
    )
}
