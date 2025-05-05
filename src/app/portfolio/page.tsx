import Link from "next/link";
import styles from "./Portfolio.module.css";

export default function Portfolio() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Portfólio</h1>
      <p className={styles.description}>Aqui você pode apresentar seus projetos, cases ou experiências profissionais.</p>
      <Link href="/" className={styles.link}>Voltar para Home</Link>
    </main>
  );
} 