import { useContext, useState } from "react";
import Logo from "../ui/Logo";
import { Link } from "react-router-dom";
import Form from "../ui/Form";
import ButtonForm from "../ui/ButtonForm";
import { userContext } from "../Context/UserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { LoadingContext } from "../Context/LoadingContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setId, setUsername: setUsernameGlobal, id } = useContext(userContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = { email, password };
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/user/login", userData);
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
            Email Address
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
        <div className="bg-white rounded-3xl w-full p-3">
          <label className="ml-3" htmlFor="password">
            Password
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
              id="password"
              name="password"
              type="password"
            />{" "}
          </div>
        </div>
        <ButtonForm>Login</ButtonForm>
        <div className="flex gap-5">
          <span className="text-gray-500">Don&apos;t have an account?</span>
          <Link to="/register" className="text-gray-500">
            Sign Up
          </Link>
        </div>
      </Form>
    </div>
  );
}
export default Login;
