import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ZootaxiSidebar.module.scss";

const ZootaxiSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem("userId"));

const menuItems = [
  { path: "/zootaxi/new", label: "Новый заказ" },
  { path: "/zootaxi/history", label: "История заказов" },
  { path: "/zootaxi/rules", label: "Правила перевозок" }
];

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/")
                  ? styles.active
                  : ""
              }`}
            >
              <button
                className={styles.navButton}
                onClick={() => navigate(item.path)}
              >
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ZootaxiSidebar;
