"use client";
import React from "react";
import LoginForm from "./LoginForm";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <main className={styles.main}>      
      <div className={styles.container}>        
        <LoginForm />
      </div>
    </main>
  );
} 