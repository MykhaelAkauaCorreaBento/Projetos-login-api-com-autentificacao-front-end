'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {

  const [leads, setLeads] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if(token === null) {
      location.href = '/login';
      return;
    }

    const listaLeads = async() => {
      try {
        const resposta = await axios.get('http://localhost:9000/lista-leads', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setLeads(resposta.data.listaLeads);
      } catch(erro) {
        if(erro.status === 401) {
          alert("401 - Acesso não autorizado");
          return;
        }
      }
    }

    listaLeads();
   
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.Usuario}>
          <span>Olá, Administrador</span>
        </div>
        <h1>Dashboard - Leads</h1>

        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {
              leads.map((lead, index) => (
                <tr key={index}>
                  <td>{lead.id}</td>
                  <td>{lead.nome}</td>
                  <td>{lead.email}</td>
                  <td>{lead.telefone}</td>
                </tr> 
              ))
            }
          </tbody>
        </table>
      </main>
    </div>
  );
}
