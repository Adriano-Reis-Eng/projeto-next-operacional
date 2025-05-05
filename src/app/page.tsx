import styles from "./pages/Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bem-vindo ao Operacional Next</h1>
      <p className={styles.subtitle}>
        Este projeto é focado na demonstração de manipulação de dados e integração com API usando Next.js.
      </p>

      <div className={styles.section}>
        <h2>Como funciona</h2>
        <ul>
          <p>1 - O login é feito com crachá e senha predefinida.</p>
          <p>2 - Após login, a API retorna um token JWT que autentica o usuário.</p>
          <p>3 - Usuários com acesso limitado podem visualizar escalas e realizar buscas.</p>
          <p>4 - Administradores podem gerenciar usuários (CRUD completo).</p>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Dados de Acesso</h2>
        <div className={styles.highlight}>
          <p><strong>Administrador</strong>: Crachá: 914737 | Senha: admin1234</p>
          <p><strong>Motorista</strong>: Crachá: 22508 | Senha: admin1234</p>
          <p><strong>Cobrador</strong>: Crachá: 25690 | Senha: admin1234</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Observações</h2>
        <p>Os dados pré-definidos não podem ser alterados, mas é possível criar novos usuários.</p>
        <p>As escalas disponíveis são predefinidas e podem ser selecionadas conforme necessidade.</p>
      </div>
    </main>
  );
}
