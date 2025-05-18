'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { payloadToken } from "../../utils/jwt";
import InputBtn from "../components/inputBtn/InputBtn";
import styles from "./LoginForm.module.css";

export default function LoginPage() {
  const [cracha, setCracha] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setError] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [message, setMessage] = useState("");
  const [nome, setNome] = useState("");  

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch('/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          funcao: "login",
          data: {
            cracha,
            senha,
          },
        }),
      });
      const result = await response.json();
      if (result.success == true) {
        Cookies.set('token', result.message);                
        const payload = payloadToken(result.message);
        if (payload) {
          sessionStorage.setItem('nome', payload.nome);
          sessionStorage.setItem('cracha', payload.cracha);
          sessionStorage.setItem('cargo', payload.cargo);
          setNome(payload.nome)
        }
        setMessage('Login realizado com sucesso!');
        setError("");
        router.push("/painel")
      }
      else {
        setError(result.message);
        setMessage("");
      }      
    } 
    catch {
      setError("Erro ao conectar com o servidor.");
    } 
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.descricao}>Controle operacional de tráfego.</h2>
        <div className={styles.container}>
          <h2 className={styles.user}> {nome} </h2>
          <form className={styles.loginForm}>
            <h1 className={styles.title}>Login</h1>
            <div className={styles.formGroup}>
              <label htmlFor="cracha" className={styles.label}>Crachá</label>
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
              <label htmlFor="senha" className={styles.label}>Senha</label>
              <div className={styles.relativeGroup}>
                <input
                  id="senha"
                  name="senha"
                  type={showSenha ? "text" : "password"}
                  required
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  className={styles.input} />
                <button
                  type="button"
                  onClick={() => setShowSenha((v) => !v)}
                  className={styles.showSenhaBtn}
                  tabIndex={-1}>
                  {showSenha ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>
            <div className={styles.button}>
              <InputBtn type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Enviando..." : "Login"}
              </InputBtn>
            </div>
            {/* <Link href="/cadastrar" className={styles.link} prefetch={false}>Alterar senha?</Link> */}
            {erro && <p className={styles.errorMsg}>{erro}</p>}
            {message && <p className={styles.successMsg}>{message}</p>}
          </form>
        </div>
      </main>
    </>
  );
} 
