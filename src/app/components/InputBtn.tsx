import styles from './InputBtn.module.css';
import { ReactNode } from 'react';

export default function InputBtn({ children, onClick, type = "button", disabled = false }: { children: ReactNode; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; type?: "button" | "submit" | "reset"; disabled?: boolean }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.button}
      onClick={onClick}>
      {children}
    </button>
  );
}