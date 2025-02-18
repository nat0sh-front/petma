import React from 'react'
import { Link } from 'react-router-dom'

import styles from './RegisterForm.module.scss'
import logo from '../../assets/icons/logo.svg'


const RegisterForm = () => {
  return (
    <div className={styles.registerForm}>
        <img className={styles.logo} src={logo} alt="Логотип Petma" />
        <div className={styles.form}>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Логин</h4>
                <input className={styles.input} type="text" id="username" placeholder="username" />
            </div>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Email</h4>
                <input className={styles.input} type="email" id="email" placeholder="name@email.com" />
            </div>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Пароль</h4>
                <input className={styles.input} type="password" id="password" placeholder="********" />
            </div>
            <button className={styles.button} type="submit">Зарегистрироваться</button>
        </div>
        <hr/>
        <p className={styles.registerText}>У вас есть аккаунт?  <Link className={styles.link} to={"/login"}>Вход</Link></p>
    </div>
  )
}

export default RegisterForm

