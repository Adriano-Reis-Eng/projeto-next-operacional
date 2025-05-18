"use client";
import { useState, useEffect } from "react";
import CadastroForm from "./CadastroForm";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";
import FuncForm from "./FuncForm"
import Listaform from "./ListaForm"
import styles from "./Cadastro.module.css";
import AvisoForm from "./AvisoForm";

export default function LoginPage() {
  const [formType, setFormType] = useState("lista");
  const [admin, setAdmin] = useState(true);

  useEffect(() => {
    const usuario = sessionStorage.getItem('cargo');
    if (usuario !== 'Administrador') {
      setAdmin(false);
    }
  }, []);

  if (!admin) {
    return <AvisoForm />
  }

  let FormComponent;
  if (formType === "lista") FormComponent = <Listaform />;
  else if (formType === "funcionario") FormComponent = <FuncForm />;
  else if (formType === "cadastro") FormComponent = <CadastroForm />;
  else if (formType === "update") FormComponent = <UpdateForm />;
  else if (formType === "delete") FormComponent = <DeleteForm />;

  return (
    <main className={styles.main}>
      <div className={styles.seletor}>
        <h1>Selecione o tipo de ação</h1>
        <select
          value={formType}
          onChange={e => setFormType(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: 240 }}>
          <option value="lista">Lista de funcionários</option>
          <option value="funcionario">Busca por crachá</option>
          <option value="cadastro">Cadastrar</option>
          <option value="update">Atualizar</option>
          <option value="delete">Deletar</option>
        </select>
        <h3>Usuários predefinidos.</h3>
        <ul>
          <h3>Administrador</h3>
          <p>Crachá: 914737 Senha: admin1234</p>
          <h3>Motorista</h3>
          <p>Crachá: 22508 Senha: admin1234</p>
          <h3>Cobrador</h3>
          <p>Crachá: 25690 Senha: admin1234</p>
          <p>Apenas os usuários predefinidos não podem ser alterados.</p>
        </ul>
      </div>
      <div className={styles.container}>
        <div className={styles.pages}>
          {FormComponent}
        </div>
      </div>
    </main>
  );
} 