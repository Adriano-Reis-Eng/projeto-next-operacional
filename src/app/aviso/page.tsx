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
                minHeight: '100vh',
                margin: 0,
                gap: 50,
                width: '100%',
                backgroundImage: 'url("/imgarquivo.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="formAviso">
            <h1 style={{ color: 'black', textAlign: 'center' }}>
                Ops!
            </h1>
            <h1 style={{ color: 'black', textAlign: 'center' }}>
                Este modulo ainda está em construção. 
            </h1>
            <h2 style={{ color: 'black', textAlign: 'center' }}>
                Estamos preparando tudo para facilitar o seu acesso as informações!
            </h2>
        </form>
    );
} 