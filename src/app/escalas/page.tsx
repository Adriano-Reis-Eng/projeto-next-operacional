'use client'
import { useState, useEffect } from "react";
import { validToken, getToken } from "../../utils/jwt";
import InputBtn from "../components/InputBtn";
import styles from "./Escalas.module.css"

interface Escala {
    servico: string;
    linha: string;
    inicio: string;
    VG2: string;
    VG3: string;
    VG4: string;
    VG5: string;
    VG6: string;
    VG7: string;
    VG8: string;
    VG9: string;
    VG10: string;
    final: string;
    dia: string;
    tipo: string;
}

export default function EscalaPage() {
    const [cracha, setCracha] = useState("");
    const [nome, setNome] = useState("");
    const [escala, setEscala] = useState<Escala[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tipoEscala, setTipoEscala] = useState("semana");
    const [dia_semana, setDiaSemana] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token || !validToken(token)) {
            setError("Necessário fazer o login.");
            return;
        }

        const payload = getToken(token);

        if (payload?.cracha) {
            setCracha(payload.cracha);
        }
        if (payload?.nome) {
            setNome(payload.nome);
        }
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();        

        const token = sessionStorage.getItem("token");
        const valdToken = validToken(token)        
        
        if (valdToken === true) {
            setLoading(true);
            setError("");
            try {
                console.log(sessionStorage.getItem("token"))
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        funcao: "Escala",
                        token: sessionStorage.getItem("token"),
                        data: {
                            cracha,
                            tipoEscala
                        }
                    })
                })
                const result = await response.json();
                console.log(result)
                if (result.success == false) {
                    setDiaSemana("Sem escala programada.");
                    setEscala([result]);
                }
                else if (result.success == true) {
                    setEscala([result.message]);
                    setDiaSemana(result.message.dia || "");
                    setError("");
                }
            } catch (error) {
                setError("Erro ao conectar com o servidor.");
            } finally {
                setLoading(false);
            }
        }
        else{
            setLoading(false);
        }
    }
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {error ? (
                    <p className={styles.errorMsg}>{error}</p>
                ) : (
                    <h2 className={styles.usuario}>{nome} {cracha}</h2>
                )}
                <div className={styles.content}>
                    <div className={styles.formGroup}>
                        <h2 className={styles.title}>Selecione o tipo de escala:</h2>
                        <select
                            className={styles.imputEscala}
                            id="escala"
                            name="escala"
                            value={tipoEscala}
                            onChange={e => setTipoEscala(e.target.value)}>
                            <option value="suplementar">Suplementar</option>
                            <option value="semana">Dias uteis</option>
                            <option value="sabado">Sábado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                        <InputBtn type="submit" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Buscar..." : "Buscar"}
                        </InputBtn>                        
                    </div>
                </div>
                
            </div>
            {escala.length > 0 && (
                <div className={styles.resultado}>
                    <h3>Escala: {dia_semana}</h3>
                    <table className={styles.tabelaEscala}>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>LInha</th>
                                <th>Início</th>
                                <th>VG2</th>
                                <th>VG3</th>
                                <th>VG4</th>
                                <th>VG5</th>
                                <th>VG6</th>
                                <th>VG7</th>
                                <th>VG8</th>
                                <th>VG9</th>
                                <th>VG10</th>
                                <th>Final</th>
                                <th>Dia</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {escala.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.servico}</td>
                                    <td>{item.linha}</td>
                                    <td>{item.inicio}</td>
                                    <td>{item.VG2}</td>
                                    <td>{item.VG3}</td>
                                    <td>{item.VG4}</td>
                                    <td>{item.VG5}</td>
                                    <td>{item.VG6}</td>
                                    <td>{item.VG7}</td>
                                    <td>{item.VG8}</td>
                                    <td>{item.VG9}</td>
                                    <td>{item.VG10}</td>
                                    <td>{item.final}</td>
                                    <td>{item.dia}</td>
                                    <td>{item.tipo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
} 