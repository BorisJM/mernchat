import { useContext, useState } from "react";
import Form from "../ui/Form";
import ButtonForm from "../ui/ButtonForm";
import Logo from "../ui/Logo";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "../Context/UserContext";
import { LoadingContext } from "../Context/LoadingContext";
import Spinner from "../ui/Spinner";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { setId, setUsername: setUsernameGlobal, id } = useContext(userContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const user = { username, email, password, passwordConfirm };
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/user", user);

      setId(data.data._id);
      setUsernameGlobal(data.data.username);
      setIsLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data.message || error.response?.data.error.message;
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-formBack">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Form handleSubmit={handleSubmit}>
        <Logo />
        <div className="flex flex-col w-full bg-white rounded-3xl p-3">
          <label className="ml-3" htmlFor="email">
            Email:
          </label>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <input
              placeholder="username@gmail.com"
              className="rounded-3xl py-1 px-2 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
        </div>
        <div className="flex flex-col w-full bg-white rounded-3xl p-3">
          <label className="ml-3" htmlFor="username">
            Username:
          </label>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <input
              placeholder="username"
              className="rounded-3xl py-1 px-2 focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="username"
              name="username"
              type="text"
              required
            />
          </div>
        </div>
        <div className="flex flex-col w-full bg-white rounded-3xl p-3">
          <label className="ml-3" htmlFor="password">
            Password:
          </label>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <input
              placeholder=".........."
              className="rounded-3xl py-1 px-2 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              id="password"
              name="password"
              type="password"
            />{" "}
          </div>
        </div>
        <div className="flex flex-col w-full bg-white rounded-3xl p-3">
          <label className="ml-3" htmlFor="passwordConfirm">
            Confirm password:
          </label>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <input
              placeholder=".........."
              className="rounded-3xl py-1 px-2 focus:outline-none"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              required
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
            />
          </div>
        </div>
        <ButtonForm>Sign Up</ButtonForm>
        <div className="flex gap-4">
          <span className="text-gray-500">Already have an account?</span>
          <Link to="/login" className="text-gray-500">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
