'use client'

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import axios from "axios";

export default function Home() {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if(token === null) {
      login();
    }
   
  }, []);

  async function login() {
      
      try {
        const resposta = await axios.post('http://localhost:9000/login', {usuario: usuario, senha: senha});
        localStorage.setItem('token', resposta.data.token);
    
        location.href = '/';
    } catch (erro) {
        alert("Usuário ou senha incorretos");
        return;
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Dashboard - Login</h1>

        <fieldset>
            <legend>Login</legend>
            <form>
                <div>
                    <label>Usuário:</label>
                    <input type="text" name="usuario" onChange={(inputUsuario) => setUsuario(inputUsuario.currentTarget.value)} value={usuario} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="senha" onChange={(inputSenha) => setSenha(inputSenha.currentTarget.value)} value={senha} />
                </div>
                <button type="button" onClick={async () => login()}>Login</button>
            </form>
        </fieldset>
      </main>
    </div>
  );
}
