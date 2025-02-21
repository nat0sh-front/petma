import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './RegisterForm.module.scss'
import logo from '../../assets/icons/logo.svg'
import { AuthContext } from '../../context/AuthContext'


const RegisterForm = () => {
    const navigation = useNavigate();
    const {register} = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      register(username, password, name, surname);
      navigation("/");
    }

  return (
    <div className={styles.registerForm}>
        <img className={styles.logo} src={logo} alt="" />
        <form className={styles.form} onSubmit={handleSubmit} >
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Логин</h4>
                <input className={styles.input} type="text" placeholder="@username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Имя</h4>
                <input className={styles.input} type="text" placeholder="Иван" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Пароль</h4>
                <input className={styles.input} type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Фамилия</h4>
                <input className={styles.input} type="text" placeholder="Иванов" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </div>
            <button className={styles.button} type="submit">Зарегистрироваться</button>
        </form>
        <hr/>
        <p className={styles.registerText}>У вас есть аккаунт?  <Link className={styles.link} to={"/login"}>Вход</Link></p>
    </div>
  )
}

export default RegisterForm

