'use client'
import { useEffect, useState } from "react";
import styles from "./painel.module.css";
import { payloadToken } from "@/utils/jwt";
import Cookies from "js-cookie";
import Link from "next/link";
import Usuario from "../components/usuario/usuario";

type Cargo = 'Administrativo' | 'Operacao';

interface MenuItem {
    href: string;
    label: string;
    description: string;
}

const menus: Record<Cargo, MenuItem[]> = {
    Administrativo: [
        { href: "/relatorios", label: "Relatorios", description: "Relátorios de movimentação, dobras, pendencias e troca de serviço" },
        { href: "/soltura", label: "Soltura", description: "Tabela de movimentação da soltura" },
        { href: "/recollhimento", label: "Recolhimento", description: "Tabela de movimentação de encerramento de jornada" },
        { href: "/trocaservico", label: "Troca de serviço", description: "Lista de pedidos de troca de seriviço" },
        { href: "/alteracoes", label: "Movimentação", description: "Lista de alterações das movimentações de funcionários" },
        { href: "/avisos", label: "Avisos", description: "Quadro de avisos." },
        { href: "/listaferias", label: "Cadastro", description: "Cadastro de funcionários e escalas." },
    ],
    Operacao: [
        { href: "/listaferias", label: "Férias", description: "Lista de férias de funcionários do tráfego." },
        { href: "/avisos", label: "Avisos", description: "Quadro de avisos." },
        { href: "/uniformes", label: "Uniformes", description: "Lista de troca de uniforme." },
        { href: "/escalas", label: "Escala", description: "Escala detalhada do funcionário." },
        { href: "/servico", label: "Serviço", description: "Escala de serviço diaria." },
        { href: "/cadastrar", label: "Senha de acesso", description: "Recadastrar senha" },
        { href: "/aviso", label: "Exames", description: "Exames periodicos e toxicologicos" },
        { href: "/aviso", label: "Palestras", description: "Listas de convocação para as palestras" },        
    ],
};

export default function Painel() {
    const [user, setUser] = useState<{ cargo: Cargo } | null>(null);    

    //const router = useRouter();
    const cargo = user?.cargo as Cargo;
    const links = user?.cargo ? menus[cargo] || [] : [];



    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            const user = payloadToken(token)
            if (user?.cargo == "Despachante" || user?.cargo == "Encarregado" || user?.cargo == "Administrador") {
                setUser({ cargo: 'Administrativo' });
            }
            else {
                setUser({ cargo: 'Operacao' });
            }
        }
    }, []);

    return (
        <main className={styles.mainPainel}>            
            <section className={styles.containerUser}>
                <Usuario />
            </section>
            <section className={styles.container}>
                {links.map(({ href, label, description }) => (
                    <Link key={href} href={href} className={styles.link} prefetch={false}>
                        <div className={styles.linkContent}>
                            <strong>{label}</strong>
                            {description && <p className={styles.linkDescription}>{description}</p>}
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    )
}