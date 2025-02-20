import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './LoginForm.module.scss'

import logo from '../../assets/icons/logo.svg'
import { AuthContext } from '../../context/AuthContext'


const LoginForm = () => {
  const navigation = useNavigate();
  const context = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(username, password)
    navigation("/");
  }

  return (
    <div className={styles.loginForm}>
        <img className={styles.logo} src={logo} alt="Логотип Petma" />
        <form className={styles.form} onSubmit={handleSubmit} >
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Логин</h4>
                <input className={styles.input} type="text" placeholder="@username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Пароль</h4>
                <input className={styles.input} type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className={styles.button} type="submit">Войти</button>
        </form>
        <hr/>
        <p className={styles.registerText}>У вас еще нет аккаунта?  <Link className={styles.link} to={"/register"}>Зарегистрируйтесь</Link></p>
    </div>
  )
}

export default LoginForm