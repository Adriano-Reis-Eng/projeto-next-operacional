'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Cadastro.module.css";
import InputBtn from "../components/inputBtn/InputBtn";
import BackBtn from "../components/backBtn/BackBtn";


export default function Cadastro() {
    const [cracha, setCracha] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");

    const [loading, setLoading] = useState(false);
    const [erro, setError] = useState("");
    const [message, setMessage] = useState("");

    const crachaValido = cracha.length >= 4;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    //const telValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const contemMaiuscula = /[A-Z]/.test(senha);
    const quantCaracteres = senha.length >= 6;
    const contemNumero = /\d/.test(senha);
    const senhaValida = contemMaiuscula && quantCaracteres && contemNumero;

    

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            value = value.replace(/(\d{5})(\d)/, "$1-$2");
        }
        setTelefone(value);
    };

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcao: "AlteraSenha",
                    token: sessionStorage.getItem('token'),
                    data: {
                        cracha: cracha,
                        email: email,
                        telefone: telefone,
                        senha: senha
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
                router.push("/login")
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
            <main className={styles.mainCadastro}>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit} className={styles.cadForm}>
                        <div className={styles.formGroup}>
                            <h1 className={styles.title}>Altere a sua senha</h1>
                            <label htmlFor="cracha" className={styles.label} style={{ color: crachaValido ? 'green' : 'red' }}>Crachá:</label>
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
                            <label htmlFor="email" className={styles.label} style={{ color: emailValido ? 'green' : 'red' }}>Email:</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="off"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={styles.input}>
                            </input>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="telefone" className={styles.label}>Telefone:</label>
                            <input
                                id="telefone"
                                name="telefone"
                                type="text"
                                autoComplete="off"
                                required
                                value={telefone}
                                onChange={handleTelefoneChange}
                                className={styles.input}>
                            </input>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="senha" className={styles.label} style={{ color: senhaValida ? 'green' : 'red' }}>Nova senha:</label>
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
                        <div className={styles.avisos}>
                            <p style={{ color: contemMaiuscula ? 'green' : 'red' }}> Use pelo menos uma letra maiúscula.</p>
                            <p style={{ color: quantCaracteres ? 'green' : 'red' }}> A senha deve ter no mínimo 6 caracteres.</p>
                            <p style={{ color: contemNumero ? 'green' : 'red' }}> Use pelo menos um número.</p>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <InputBtn type="submit" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Enviando..." : "Enviar"}
                            </InputBtn>
                        </div>
                        <section className={styles.containerBtn}>
                            <BackBtn />
                        </section>
                        {erro && <p className={styles.errorMsg}>{erro}</p>}
                        {message && <p className={styles.successMsg}>{message}</p>}
                    </form>
                </div>
            </main>
        </>
    )
}
