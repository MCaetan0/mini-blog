import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmaPassword, setConfirmaPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmaPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    console.log(user);
    console.log(error);
  };
  return (
    <div className={styles.Register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe as suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placheholder="Nome do Usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placheholder="E-mail do Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placheholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirmação da senha:</span>
          <input
            type="password"
            name="confirmaPassword"
            required
            placheholder="Confirme a sua senha"
            value={confirmaPassword}
            onChange={(e) => setConfirmaPassword(e.target.value)}
          />
        </label>
        <button className="btn">Cadastrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
