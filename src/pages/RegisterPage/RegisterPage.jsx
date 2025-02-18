import React from 'react'
import styles from './RegisterPage.module.scss'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const RegisterPage = () => {
  return (
    <div className={styles.registerPage}>
        <div className={styles.overlay}></div>
        <RegisterForm />
    </div>
  )
}

export default RegisterPage