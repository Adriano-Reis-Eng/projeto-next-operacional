'use client'
import { useState, useEffect } from "react";
import { validToken, getToken } from "../../utils/jwt";
import InputBtn from "../components/InputBtn";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [cracha, setCracha] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setError] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [message, setMessage] = useState("");
  const [nome, setNome] = useState("");
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token && validToken(token)) {
      const payload = getToken(token);
      if (payload?.nome) {
        setNome(payload.nome);
        setLogado(true);
      }
      if (payload?.cargo) {
        sessionStorage.setItem("cargo", payload.cargo);
      }
    } else {
      setLogado(false);
      setError("Necessário fazer o login.");
    }
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cargo");
    setNome("");
    setLogado(false);
    setMessage("Você saiu da conta.");
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("teste")  
    setLoading(true);
    setError("");
    try {
      console.log("try")      
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
      console.log("teste",result)      
      if (result.success == false) {
        setError(result.message);
        setMessage("");
      } else if (result.success == true) {
        sessionStorage.setItem("token", result.message);
        const token = sessionStorage.getItem("token");
        const payload = getToken(token);
        if (payload?.nome) {
          setNome(payload.nome);
        }
        if (payload?.cargo) {
          sessionStorage.setItem('cargo', payload.cargo)
        }
        setMessage('Login realizado com sucesso!');
        setError("");
      }
    } catch {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className={styles.user}> {nome} </h2>
      <form className={styles.loginForm}>
        <div className={styles.formGroup}>
          <h1 className={styles.title}>Login</h1>
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
        <div className={styles.buttonWrapper}>
          {!logado ? (
            <InputBtn type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Enviando..." : "Login"}
            </InputBtn>
          ) : (
            <InputBtn type="button" onClick={handleLogout}>
              Sair
            </InputBtn>
          )}
        </div>
        {erro && <p className={styles.errorMsg}>{erro}</p>}
        {message && <p className={styles.successMsg}>{message}</p>}
      </form>
    </>
  );
} 