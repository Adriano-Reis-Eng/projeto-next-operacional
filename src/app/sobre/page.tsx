"use client";
import React from "react";

export default function AvisoForm() {
    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '100vh',
                margin: 0,
                gap: 10,
                width: '100%',
                backgroundImage: 'url("/imgarquivo.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="formAviso">
            <h1 style={{ color: 'black', textAlign: 'start', marginLeft: '48%', marginBottom: '10%' }}>
                Seja bem vindo!
            </h1>
            <h2 style={{ color: 'black', textAlign: 'start', marginLeft: '30%' }}>
                Este é um projeto para acesso de informações e está em faze de testes,
            </h2>
            <h2 style={{ color: 'black', textAlign: 'start', marginLeft: '30%' }}>
                Qualquer informação divergente por favor DESCONSIDERE.
            </h2>
            <h2 style={{ color: 'black', textAlign: 'start', marginLeft: '30%', marginBottom: '10%' }}>
                Desenvolvido por <span style={{ fontStyle: 'italic', color: '#FF4500' }}>Adriano Reis - Engenheiro de Software</span>  é um teste para mostragem e manipulação de dados.
            </h2>
        </form>
    );
} 