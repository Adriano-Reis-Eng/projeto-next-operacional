// 'use client'
// import { useState, useEffect, use } from "react";
// import InputBtn from "../components/inputBtn/InputBtn";
// import styles from "./OperacaoForm.module.css"

// interface Escala {
//     servico: string;
//     linha: string;
//     inicio: string;    
//     carro: string;
//     carroSubstituto: string;
//     final: string;
//     complemento: string;
//     motorista: string;
//     cobrador: string;
//     motsubstituto:string;
//     cobsubstituto:string;   
// }

// export default function ListaOperacao() {
//     const [escala, setEscala] = useState<Escala[]>([]);
//     const [diaOperacao, setDiaOperacao] = useState("operacaoDU");
//     const [nCar, setnCar] = useState("");
//     const [nMotorista, setnMotorista] = useState("");
//     const [nCobrador, setnCobrador] = useState("");
//     const [nMotSubstituto, setnMotSubstituto] = useState("");
//     const [nCobSubstituto, setnCobSubstituto] = useState("");
//     const [erro, setError] = useState("Lista vazia");

//     useEffect(() => {
//         const usuario = sessionStorage.getItem('cargo');
//         if (usuario === 'Administrador') {
//             fetchSoltura(); // chamada automática ao carregar
//         }
//     }, []);

//     async function handleSubmit(e: React.FormEvent) {
//         e.preventDefault();
//         await fetchSoltura();
//     }

//     async function fetchSoltura() {
//         setError("");
//         try {
//             const response = await fetch("/api/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     funcao: "getData",
//                     token: sessionStorage.getItem("token"),
//                     sheet: diaOperacao,
//                     data: {
//                     }
//                 })
//             })
//             const result = await response.json();
//             if (result.success == false) {
//                 setError(result.message);
//             }
//             else if (result.success == true) {
//                 setEscala(result.message);                
//             }

//         } catch {
//             setError("Erro ao conectar com o servidor.");
//         }
// }    

// return (
//     <>
//         <main className={styles.main}>
//             {escala.length > 0 && (
//                 <div className={styles.resultado}>
//                     <h3>Escala:</h3>
//                     <table className={styles.tabelaEscala}>
//                         <thead>
//                             <tr>
//                                 <th>Serviço</th>
//                                 <th>Linha</th>
//                                 <th>Início</th>                                
//                                 <th>Carrro</th>
//                                 <th>Final</th>
//                                 <th>Complemento</th>
//                                 <th>Motorista</th>
//                                 <th>Cobrador</th>
//                                 <th>Mot. Substituto</th>
//                                 <th>Cob. substituto</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {escala.map((item: Escala, idx: number) => (
//                                 <tr key={idx}>
//                                     <td>{item.servico}</td>
//                                     <td>{item.linha}</td>
//                                     <td>{item.inicio}</td>                                    
//                                     <td>{item.carro}</td>                                    
//                                     <td><input type="text" value={item.carro} onChange={e => setnCar(e.target.value)}/></td>
//                                     <td>{item.final}</td>                                    
//                                     <td><input type="text" value={item.motorista} onChange={e => setnMotorista(e.target.value)}/></td>
//                                     <td><input type="text" value={item.cobrador} onChange={e => setnCobrador(e.target.value)}/></td>
//                                     <td><input type="text" value={item.motsubstituto} onChange={e => setnMotSubstituto(e.target.value)}/></td>
//                                     <td><input type="text" value={item.cobsubstituto} onChange={e => setnCobSubstituto(e.target.value)}/></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </main>
//     </>
// )
// }