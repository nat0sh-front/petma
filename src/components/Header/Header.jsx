import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

import search from '../../assets/icons/search.svg';
import notification from '../../assets/icons/notification.svg';
import avatar from '../../assets/images/avatar.png';
import arrowDown from '../../assets/icons/arrow-down.svg';
import logout from '../../assets/icons/logout.svg';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        navigate('/login');
    };

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
                            <button
                                className={`${styles.dropdownButton} ${isOpen ? styles.active : ''}`}
                                onClick={toggleDropdown}
                            >
                                <img className={styles.avatar} src={user?.avatar || avatar} alt="Аватарка" />
                                {user ? (
                                    <span className={styles.username}>{user.name} {user.surname}</span>
                                ) : (
                                    <span className={styles.username}>Гость</span>
                                )}
                                <img
                                    className={`${styles.dropdownIcon} ${isOpen ? styles.rotated : ''}`}
                                    src={arrowDown}
                                    alt=""
                                />
                            </button>
                            {isOpen && (
                                <div className={styles.dropdownContent}>
                                    <button className={styles.logoutButton} onClick={handleLogout}>
                                        <img className={styles.logoutIcon} src={logout} alt="" />
                                        <span className={styles.logout}>Выйти</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
