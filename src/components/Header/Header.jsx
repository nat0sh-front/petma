import React from 'react'
import styles from './Header.module.scss'
import search from '../../assets/icons/search.svg'
import notification from '../../assets/icons/notification.svg'
import avatar from '../../assets/images/avatar.png'
import arrowDown from '../../assets/icons/arrow-down.svg'

const Header = () => {
  return (
    <div className={styles.header}>
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <div className={styles.navButtons}>
                    <li className={styles.navItem}>
                        <button className={styles.navButton}>
                            <img className={styles.navIcon} src={search} alt="" />
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <button className={styles.navButton}>
                            <img className={styles.navIcon} src={notification} alt="" />
                        </button>
                    </li>
                </div>
                <li className={styles.navItem}>
                    <div className={styles.dropdown}>
                        <button className={styles.dropdownButton}>
                            <img className={styles.avatar} src={avatar} alt="Аватарка" />
                            <span className={styles.username}>Натали Гвоздь</span>
                            <img className={styles.dropdownIcon} src={arrowDown} alt="" />
                        </button>
                        {/* <div className={styles.dropdownContent}>
                            <button className={styles.logoutButton}>
                                Выйти
                            </button>
                        </div> */}
                    </div>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Header