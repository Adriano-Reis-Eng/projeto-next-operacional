import styles from "./Sobre.module.css";

export default function Sobre() {
  return (
    <main className={styles.main}>
      <h2>&nbsp;&nbsp;&nbsp;React e Next.js</h2>
      <p className={styles.description}>&nbsp;&nbsp;&nbsp;React é uma biblioteca JavaScript para construir interfaces interativas. Next.js é um framework que estende o React com renderização no servidor, rotas automáticas e otimização de desempenho. Juntas, essas tecnologias permitem criar aplicações web modernas, rápidas e escaláveis.</p>
      <h2>&nbsp;&nbsp;&nbsp;Sobre o projeto</h2>
      <ul>
        <p className={styles.description}>1-Este é um sistema de exemplo criado com React + Next.js simulando um sistema de controle operacional.</p>
        <p className={styles.description}>2-Este sistema possui um banco de dados online com api apps script.</p>
        <p className={styles.description}>3-Sistema de login com autenticação e token JWT gerado pela api com tempo de expiração, necessário o login a cada vez que encerra a página.</p>
        <p className={styles.description}>4-Sistema de cadastro com funções para criar, alterar e excluir um usuário.</p>
        <p className={styles.description}>5-O sistema de cadastro pode ser acessado apeneas por usuários do tipo Administrador autenticados.</p>
        <p className={styles.description}>6-As escalas podem ser acessadas por todos usuários após o login sendo que cada usuário pode acessar somente a própria escala, sem acesso indevido a informações de outros usuários.</p>
      </ul>
      <h2>&nbsp;&nbsp;&nbsp;Detalhes</h2>
      <ul>
        <p className={styles.description}>1-Função de Login com autenticação JWT.</p>
        <p className={styles.description}>2-Visualização de lista de dados recebidos pela API.</p>
        <p className={styles.description}>3-Funções para criar, atualizar e apagagar dados de usuário.</p>
        <p className={styles.description}>4-Limite de acesso para os tipos de usuário.</p>        
      </ul>
      <h2>&nbsp;&nbsp;&nbsp;Linguagens, Bibliotecas e Frameworks utilizados</h2>
      <ul>
        <p className={styles.description}>1-JavaScript para programação da API e TypeScript para o desenvolvimento React.js.</p>
        <p className={styles.description}>2-A Biblioteca utilizada é React.js para contrução da interface do usuário.</p>
        <p className={styles.description}>3-O framework Next.js que é focado em desempenho e escalabilidade para criar aplicações Web Modernas.</p>
      </ul>      
    </main>
  );
} 