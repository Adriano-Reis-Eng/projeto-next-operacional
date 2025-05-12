'use client';
import { useState } from 'react';
import styles from './Avisos.module.css';
import BackBtn from '../components/backBtn/BackBtn';

const avisos = [
    { id: '1', titulo: 'Ocorrências', descricao: 'SENHORES COLABORADORES, PEDIMOS QUE QUALQUER OCORRÊNCIA NO INTERIOR DO VEÍCULO COM PASSAGEIRO, QUEBRA DO VEÍCULO, COLISÃO, NECESSIDADE DE DEVIAR O ITINERÁRIO, ENTRE OUTROS... \n \n\nO PRIMEIRO PROCEDIMENTO É LIGAR PARA O CCO.' },
    { id: '2', titulo: 'Atestados', 
    descricao: `1-As homologações dos atestados médicos devem ser realizadas de forma presencial (prazo 48h).   
    2-Atestados médicos por suspeita ou confirmação de COVID devem ser enviados até 48h para o Whatsapp do departamento médico, junto com o exame.
    3-Para averabação dos atestados é necessário o atestado original e folho de ponto devidamente regularizada.
    4-Atendimento médico de 08:00h às 12:00h.
    5-Em caso de internação ou acamado entre em contato com o departemento médico pelo WhatsApp, a homologação pode ser feita pelo familiar ou intercessor nestes casos.
    
    Duvidas?
    99856-8843
    Departemento médico. ` },
    // { id: '3', titulo: 'Aviso 3', descricao: 'Conteúdo do aviso 3.' },
    // { id: '4', titulo: 'Aviso 4', descricao: 'Conteúdo do aviso 4.' },
    // { id: '5', titulo: 'Aviso 5', descricao: 'Conteúdo do aviso 5.' },
];

export default function Avisos() {

    const [selectedId, setSelectedId] = useState('1'); // aviso inicial


    const avisoSelecionado = avisos.find(aviso => aviso.id === selectedId);

    return (
        <main className={styles.main}>
            <section className={styles.containerBtn}>
                <BackBtn />
            </section>
            <section className={styles.containerAviso}>
                <section className={styles.menuSection}>
                    <ul>
                        {avisos.map(aviso => (
                            <li key={aviso.id}>
                                <button
                                    onClick={() => setSelectedId(aviso.id)}
                                    className={`${styles.link} ${selectedId === aviso.id ? styles.active : ''}`}>
                                    {aviso.titulo}
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
            <section className={styles.sectionAviso}>
                {avisoSelecionado && (
                    <div className={styles.avisoBox}>
                        <h1>{avisoSelecionado.titulo}</h1>
                        <h2>&nbsp;&nbsp;&nbsp;{avisoSelecionado.descricao}</h2>
                    </div>
                )}
            </section>
        </main>
    );
}
