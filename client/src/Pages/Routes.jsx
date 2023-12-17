import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import Register from "./Register";
import { useContext } from "react";
import { userContext } from "../Context/UserContext";
import Settings from "./Settings";
import { LoadingContext } from "../Context/LoadingContext";
import Spinner from "../ui/Spinner";

function AppRoutes() {
  const { id, username } = useContext(userContext);
  const { isLoading } = useContext(LoadingContext);
  const isLogged = !!id || !!username;

  if (isLoading) return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLogged ? <Chat /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={!isLogged ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/register"
          element={!isLogged ? <Register /> : <Navigate replace to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;
