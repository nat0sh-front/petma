import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";

import logo from "../../assets/icons/logo.svg";
import home from "../../assets/icons/home.svg";
import profile from "../../assets/icons/profile.svg";
import chat from "../../assets/icons/chat.svg";
import events from "../../assets/icons/events.svg";
import service from "../../assets/icons/service.svg";
import zootaxi from "../../assets/icons/zootaxi.svg";
import settings from "../../assets/icons/settings.svg";

const Sidebar = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const userId = JSON.parse(localStorage.getItem("userId"));

  const menuItems = [
    { path: "/dashboard", icon: home, label: "Главная" },
    { path: `/profile/${userId}`, icon: profile, label: "Профиль" },
    { path: "/chat", icon: chat, label: "Чат" },
    { path: "/events", icon: events, label: "События" },
    { path: "/services", icon: service, label: "Услуги" },
    { path: "/zootaxi", icon: zootaxi, label: "ZooТакси" }
  ];

  return (
    <div className={styles.sidebar}>
      <img className={styles.logo} src={logo} alt="" />
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ""}`}>
              <button className={styles.navButton} onClick={() => navigate(item.path)}>
                <img className={styles.navIcon} src={item.icon} alt={item.label} />
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
