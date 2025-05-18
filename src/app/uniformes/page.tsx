'use client'
import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./uniforne.module.css";
import InputBtn from "../components/inputBtn/InputBtn";
import Usuario from "../components/usuario/usuario";
import BackBtn from "../components/backBtn/BackBtn";

interface Uniformes {
    camisa: string;
    calca: string;
    sapato: string;
}    

export default function Cadastro() {
    const [uniformes, setUniformes] = useState<Uniformes[]>([]);
    const [camisa, setCamisa] = useState("Número 01");
    const [calca, setCalca] = useState("Número 36");
    const [sapato, setSapato] = useState("Número 35");
    const [loading, setLoading] = useState(false);
    const [erro, setError] = useState("");
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
                    funcao: "UpdateData",
                    token: Cookies.get('token'),
                    sheet: 'uniformes',
                    data: {
                        cracha: sessionStorage.getItem('cracha'),
                        camisa: camisa,
                        calca: calca,
                        sapato: sapato
                    },
                }),
            });

            const result = await response.json();
            if (result.success == false) {
                setError(result.message);
                setMessage("")
            }
            else if (result.success == true) {
                const novoUniforme: Uniformes = {
                    camisa,
                    calca,
                    sapato                    
                };

                setUniformes([novoUniforme]);
                setMessage(result.message);
                setError("");
            }
        } catch {
            setError("Erro ao conectar com o servidor.");
        }
        finally {
            setLoading(false);
            setCamisa("");
            setCalca("");
            setSapato("");
        }
    }

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        setError("");        
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    funcao: "GetData",
                    token: Cookies.get("token"),
                    sheet: "uniformes",
                    data: {
                        cracha: sessionStorage.getItem('cracha')
                    }
                })
            })
            const result = await response.json();
            console.log('teste', result);
            if (result.success == false) {
                setError(result.message);
            }
            else if (result.success == true) {
                setUniformes([...result.message]);
                setMessage("");
            }

        } catch {
            setError("Erro ao conectar com o servidor.");
        }
    }

    useEffect(() => {

    }, [uniformes]);

    return (
        <>
            <main className={styles.main}>
                <section className={styles.containerUser}>
                    <Usuario />
                </section>
                <section className={styles.containerBtn}>
                    <BackBtn />
                </section>
                <section className={styles.lista}>
                    <h2>Uniformes Cadastrados</h2>                    
                    {uniformes.length === 0 ? (
                        <p>Buscando...</p>
                    ) : (
                        <ul className={styles.listaUniformes}>
                            {uniformes.map((item, index) => (
                                <li key={index} className={styles.itemUniforme}>
                                    <div><strong>Camisa: </strong> {item.camisa}</div>
                                    <div><strong>Calça: </strong> {item.calca}</div>
                                    <div><strong>Sapato: </strong> {item.sapato}</div>                                    
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <section className={styles.container}>
                    <form onSubmit={handleSubmit} className={styles.cadForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="camisa" className={styles.label}>Camisa:</label>
                            <select
                                className={styles.select}
                                id="camisa"
                                name="camisa"
                                required
                                value={camisa}
                                onChange={e => setCamisa(e.target.value)}>
                                <option value="Número 01">Número 01</option>
                                <option value="Número 02">Número 02</option>
                                <option value="Número 03">Número 03</option>
                                <option value="Número 04">Número 04</option>
                                <option value="Número 05">Número 05</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="calca" className={styles.label}>Calça:</label>
                            <select
                                className={styles.select}
                                id="calca"
                                name="calca"
                                required
                                value={calca}
                                onChange={e => setCalca(e.target.value)}>
                                <option value="Número 36">Número 36</option>
                                <option value="Número 38">Número 38</option>
                                <option value="Número 40">Número 40</option>
                                <option value="Número 42">Número 42</option>
                                <option value="Número 44">Número 44</option>
                                <option value="Número 46">Número 46</option>
                                <option value="Número 48">Número 48</option>
                                <option value="Número 50">Número 50</option>
                                <option value="Número 52">Número 52</option>
                                <option value="Número 54">Número 54</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="sapato" className={styles.label}>Sapato:</label>
                            <select
                                className={styles.select}
                                id="sapato"
                                name="sapato"
                                required
                                value={sapato}
                                onChange={e => setSapato(e.target.value)}>
                                <option value="Número 35">Número 35</option>
                                <option value="Número 36">Número 36</option>
                                <option value="Número 37">Número 37</option>
                                <option value="Número 38">Número 38</option>
                                <option value="Número 39">Número 39</option>
                                <option value="Número 40">Número 40</option>
                                <option value="Número 41">Número 41</option>
                                <option value="Número 42">Número 42</option>
                                <option value="Número 43">Número 43</option>
                                <option value="Número 44">Número 44</option>
                                <option value="Número 45">Número 45</option>
                            </select>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <InputBtn type="submit" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Enviando..." : "Alterar"}
                            </InputBtn>
                        </div>
                        {erro && <p className={styles.errorMsg}>{erro}</p>}
                        {message && <p className={styles.successMsg}>{message}</p>}
                    </form>
                </section>
            </main>
        </>
    )
}
