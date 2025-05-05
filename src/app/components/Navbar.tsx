import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}></span>
        <span className={styles.logoText}>Operacional Next.js</span>
      </div>
      <div className={styles.links}>
        <Link href="/" className={styles.link} prefetch={false}>Home</Link>        
        <Link href="/sobre" className={styles.link} prefetch={false}>Sobre</Link>        
        <Link href="/escalas" className={styles.link} prefetch={false}>Escala</Link>
        <Link href="/cadastro" className={styles.link} prefetch={false}>Cadastro</Link>
        <Link href="/login" className={styles.link} prefetch={false}>Login</Link>
      </div>
    </nav>
  );
} 