import { Dashboard, Login, Signup } from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar.js/Navbar";
import QrScanner from "./components/QrScanner/QrScanner";
import "react-toastify/dist/ReactToastify.css";
import ItemList from "./pages/ItemList/ItemList";
import EditItem from "./pages/EditItems/EditItem";
import Chat from "./pages/Chat/Chat";
import { Button } from "react-bootstrap";
import MessageForm from "./components/MessageForm/MessageForm";
import LandingPage from "./pages/LandingPage/LandingPage";
import ChatStart from "./components/ChatStart/ChatStart";
import axios from "axios";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user_id"));
  const [isAdmin, setIsAdmin] = useState(false);
  const user_id = localStorage.getItem("user_id");

  const getAdmin = async () => {
    const data = await axios.get("/api/users/getAdmin");
    if (data.data.data[0]._id === user_id) {
      setIsAdmin(true);
    }
  };
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault(); // Prevent the default prompt from showing
      getAdmin();
      // Store the deferred prompt for later use
      setDeferredPrompt(event);
    });
  }, [deferredPrompt]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      console.log("first");
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        // Reset the deferred prompt so it can be used again
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      <div className="main_container">
        <Button
          style={{
            position: "absolute",
            zIndex: 1,
            top: "10px",
            right: "10px",
          }}
          onClick={handleInstallClick}
        >
          Install Application
        </Button>
        {loggedIn && (
          <div className="sidebar_container">
            <Navbar setLoggedIn={setLoggedIn} />
          </div>
        )}
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate replace to={"/dashboard"} />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                loggedIn ? <Dashboard /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/employee"
              element={
                loggedIn ? <Profile /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/scan"
              element={
                loggedIn ? <QrScanner /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/itemList"
              element={
                loggedIn ? <ItemList /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/editItems"
              element={
                loggedIn ? <EditItem /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/chat"
              element={
                loggedIn ? (
                  <Chat isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            >
              <Route
                path=""
                element={
                  <ChatStart isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                }
              />
              <Route
                path="start"
                element={
                  <MessageForm isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                }
              />
            </Route>

            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
