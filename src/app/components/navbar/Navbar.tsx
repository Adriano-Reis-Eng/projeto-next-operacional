'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { payloadToken } from "@/utils/jwt";
import InputBtn from "../inputBtn/InputBtn";

type Cargo = 'Administrativo' | 'Operacao';

const menus = {
  Administrativo: [
    { href: "/painel", label: "Painel" },
    { href: "/home", label: "Principal" },
    { href: "/soltura", label: "Soltura" },
    { href: "/operacao", label: "Operação" },
    { href: "/escalas", label: "Escala" },
    { href: "/cadastro", label: "Cadastro" },
  ],
  Operacao: [
    { href: "/painel", label: "Painel" },
    { href: "/sobre", label: "Sobre" },
    { href: "/cadastrar", label: "Cadastrar" },
  ],
};
type User = {
  cargo: Cargo;
};

export function Navbar() {  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
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

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     const user = payloadToken(token);
  //     setUser(user);
  //   }
  // }, []);

  async function handleLogout() {
    setLoading(true);
    Cookies.remove("token");
    await fetch("/api/logout");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    router.push("/");
  }

  return (
    <main className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}></span>
        <span className={styles.logoText}>Operacional</span>
      </div>
      {links.length > 0 && (
        <div className={styles.links}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link} prefetch={false}>
              {label}
            </Link>
          ))}
          <div className={styles.sairBtn}>
            <InputBtn type="submit" onClick={handleLogout} disabled={loading}>
              {loading ? "Saindo..." : "Sair"}
            </InputBtn>
          </div>
        </div>
      )}
    </main>
  );
}
