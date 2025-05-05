"use client";
import React from "react";

export default function AvisoForm() {
    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // ocupa a altura total da tela
                margin: 0,
                gap: 50,
                width: '100%',
            }} className="formAviso">
            <h1 style={{ color: 'black', textAlign: 'center' }}>
                Atenção!
            </h1>
            <h1 style={{ color: 'black', textAlign: 'center'}}>
                Somente administradores podem fazer alterações nos cadastros.
            </h1>
            <h2 style={{ color: 'black', textAlign: 'center'}}>
                Caso seja necessário alterar alguma informação procure o seu Administrador.
            </h2>
        </form>
    );
} 