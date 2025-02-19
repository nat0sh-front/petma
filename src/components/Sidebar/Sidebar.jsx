import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

import logo from "../../assets/icons/logo.svg";
import home from "../../assets/icons/home.svg";
import profile from "../../assets/icons/profile.svg";
import chat from "../../assets/icons/chat.svg";
import store from "../../assets/icons/store.svg";
import zootaxi from "../../assets/icons/zootaxi.svg";
import settings from "../../assets/icons/settings.svg";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <img className={styles.logo} src={logo} alt="" />
      <nav className={styles.nav}>
        <ul className={styles.navList}>
        <li className={`${styles.navItem} ${styles.active}`}>
          <Link to="/" className={styles.navLink}>
            <img className={styles.navIcon} src={home} alt="" />
            <span className={styles.navLabel}>Главная</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/profile" className={styles.navLink}>
            <img className={styles.navIcon} src={profile} alt="" />
            <span className={styles.navLabel}>Профиль</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/chat" className={styles.navLink}>
            <img className={styles.navIcon} src={chat} alt="" />
            <span className={styles.navLabel}>Чат</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/store" className={styles.navLink}>
            <img className={styles.navIcon} src={store} alt="" />
            <span className={styles.navLabel}>Магазин</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/zootaxi" className={styles.navLink}>
            <img className={styles.navIcon} src={zootaxi} alt="" />
            <span className={styles.navLabel}>ZooТакси</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/login" className={styles.navLink}>
            <img className={styles.navIcon} src={settings} alt="" />
            <span className={styles.navLabel}>Настройки</span>
          </Link>
        </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
