import styles from './ZootaxiLayout.module.scss'
import Zootaxi from '../../components/Zootaxi/Zootaxi'
import ZootaxiSidebar from '../../components/ZootaxiSidebar/ZootaxiSidebar'
import OrderHistory from '../../components/OrderHistory/OrderHistory'
import { useLocation } from 'react-router-dom'
import ZootaxiRules from '../../components/ZootaxiRules/ZootaxiRules'

const ZootaxiLayout = () => {
  const location = useLocation();

  let content;
  if (location.pathname === "/zootaxi/history") {
    content = <OrderHistory />;
  } else if (location.pathname === "/zootaxi/rules") {
    content = <ZootaxiRules />;
  } else {
    content = <Zootaxi />;
  }

  return (
    <div className={styles.zootaxiLayout}>
      {content}
      <ZootaxiSidebar />
    </div>
  );
};

export default ZootaxiLayout;
