import { useState, useEffect } from "react";
import styles from "./ListaForm.module.css";

interface Funcionarios {
    cracha: string;
    nome: string;
    telefone: string;
    email: string;
    cargo: string;
    setor: string;
}

export default function ListaForm() {
    const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);    
    const [erro, setError] = useState("Lista vazia");
    const [message, setMessage] = useState("Buscando...");

    useEffect(() => {
        const usuario = sessionStorage.getItem('cargo');
        if (usuario === 'Administrador') {
            fetchFuncionarios(); // chamada automática ao carregar
        }
    }, []);
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await fetchFuncionarios();
    }

    async function fetchFuncionarios() {
        setError("");       
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcao: "getData",
                    token: sessionStorage.getItem("token"),
                    sheet: "usuarios",
                    data: {
                    }
                })
            })
            const result = await response.json();
            if (result.success == false) {
                setError(result.message);
            }
            else if (result.success == true) {
                setFuncionarios(result.message);
                setMessage("Lista encontrada");
            }

        } catch (error) {
            setError("Erro ao conectar com o servidor.");
        }        
    }

    return (
        <form onSubmit={handleSubmit} className={styles.listaForm}>
            {funcionarios.length > 0 && (
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
                            {funcionarios.map((item, idx) => (
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
    );
}