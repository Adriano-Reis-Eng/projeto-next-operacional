'use client';

import { useRouter } from 'next/navigation';
import styles from "./BabkBtn.module.css"

export default function BackBtn() {
    const router = useRouter();

    const handleClick = () => {
        // Opcional: iniciar animação aqui
        setTimeout(() => {
            router.back();
        }, 300); // 300ms de atraso (ajuste conforme necessário)
    };

    return (
        <button onClick={(handleClick)} className={styles.button}>           
        </button>
    );
}