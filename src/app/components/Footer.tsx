import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
            <Link href="https://github.com/Adriano-Reis-Eng?tab=repositories" target="_blank" title="GitHub" className={styles.link} prefetch={false}><span className={styles.logoIcon}></span></Link>                
                <span className={styles.logoText}>2025 | Adriano Reis-Engenheiro de Software e desenvolvedor Full-Stack</span>
            </div>
            <div className={styles.links}>
                <Link href="https://github.com/Adriano-Reis-Eng?tab=repositories" target="_blank" title="GitHub" className={styles.link} prefetch={false}><span className={styles.iconGit}></span></Link>
                <Link href="https://adriano-reis-eng.github.io/landing_page/" className={styles.link} target="_blank" title="LandingPage" prefetch={false}><span className={styles.iconLanding}></span></Link>
                <Link href="tel:5561986091381" className={styles.link} title="Whatsapp" target="_blank" prefetch={false}><span className={styles.iconTel}></span></Link>                
            </div>
        </footer>
    )
}