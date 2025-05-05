"use client";
import { useState } from "react";
import React from "react";
import LoginForm from "./LoginForm";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <main className={styles.main}>      
      <div className={styles.container}>        
        <LoginForm />
      </div>
    </main>
  );
} 