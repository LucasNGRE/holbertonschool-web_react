import { memo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markNotificationAsRead } from "../../features/notifications/notificationsSlice";
import NotificationItem from "../NotificationItem/NotificationItem";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../../assets/close-icon.png";
import { getFilteredNotifications } from "../../features/selectors/notificationSelector";


const opacityKeyframes = {
  from: { opacity: 0.5 },
  to: { opacity: 1 },
};

const bounceKeyframes = {
  "0%": { transform: "translateY(0px)" },
  "50%": { transform: "translateY(-5px)" },
  "100%": { transform: "translateY(5px)" },
};

const styles = StyleSheet.create({
  notificationItems: {
    position: "relative",
    border: "3px dotted #e1003c",
    padding: "5px",
    fontFamily: "Roboto, sans-serif",
    width: "25%",
    float: "right",
    marginTop: "20px",
    opacity: 0,
    visibility: "hidden",
    "@media (max-width: 900px)": {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "none",
      padding: 0,
      margin: 0,
      fontSize: "20px",
      backgroundColor: "white",
      zIndex: 1000,
    },
  },

  visible: {
    opacity: 1,
    visibility: "visible",
  },

  ul: {
    "@media (max-width: 900px)": {
      padding: 0,
    },
  },

  p: {
    margin: 0,
    "@media (max-width: 900px)": {
      fontSize: "20px",
    },
  },

  button: {
    position: "absolute",
    cursor: "pointer",
    right: "calc(0% - 480px)",
    top: "calc(0% - 480px)",
    background: "transparent",
    transform: "scale(0.012)",
  },

  menuItem: {
    float: "right",
    position: "absolute",
    right: "10px",
    top: "-5px",
    backgroundColor: "#fff8f8",
    cursor: "pointer",
    ":hover": {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: "1s, 0.5s",
      animationIterationCount: "3, 3",
    },
  },
});

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.notifications.loading);
  const [currentFilter, setCurrentFilter] = useState('all');

  const drawerRef = useRef(null);

  const handleToggleDrawer = () => {
    if (!drawerRef.current) return;
    drawerRef.current.classList.toggle(css(styles.visible));
  };

  const handleMarkNotificationAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter)
  );

  const handleSetFilterUrgent = () => {
  setCurrentFilter('urgent');
  };

  const handleSetFilterDefault = () => {
    setCurrentFilter('default');
  };


  return (
    <>
      <div className={css(styles.menuItem)} onClick={handleToggleDrawer}>
        Your notifications
      </div>

      <div ref={drawerRef} className={css(styles.notificationItems)}>
        {loading ? (
          <p className={css(styles.p)}>Loading...</p>
        ) : filteredNotifications.length > 0 ? (
          <>
            <p className={css(styles.p)}>Here is the list of notifications</p>
            <button
              onClick={handleToggleDrawer}
              aria-label="Close"
              className={css(styles.button)}
            >
              <img src={closeIcon} alt="close icon" />
            </button>
            <div>
              <button onClick={handleSetFilterUrgent}>‼️</button>
              <button onClick={handleSetFilterDefault}>??</button>
            </div>

            <ul className={css(styles.ul)}>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={handleMarkNotificationAsRead}
                />
              ))}
            </ul>
          </>
        ) : (
          <p className={css(styles.p)}>No new notifications for now</p>
        )}
      </div>
    </>
  );
});

export default Notifications;
