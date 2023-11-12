import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const fetchItems = async () => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending request",
          type: "warning",
        })
      );

      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent request successfully",
          type: "success",
        })
      );
    };
    fetchItems().catch((err) => {
      uiActions.showNotification({
        open: true,
        message: "Sending request failed",
        type: "error",
      });
    });
  }, [cart, dispatch]);
  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
