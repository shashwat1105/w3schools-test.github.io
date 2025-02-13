import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
  const apiBase="https://shivam.zewaa.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBase}/login`, {
        email,
        password,
      });
      setMessage(response.data.message);
      navigate("/home");

    } catch (error) {
      setMessage("Error logging in.",error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-8 p-2 border-2 shadow-xl rounded-[1.8rem] px-12 py-[60px]">

      
      <h2 className="flex justify-center items-center text-center text-bold text-[50px]">Login</h2>
      <form className="flex flex-col gap-4 text-[25px] font-medium" onSubmit={handleLogin}>
        <input className="pl-5 border-2 shadow-xl rounded-[1.8rem]  outline-none  p-2 mb-5"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        <input className="pl-5 border-2 shadow-xl rounded-[1.8rem] outline-none p-2 mb-5 "
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        <button className="border-2 border-black shadow-lg rounded-[1.8rem] px-6 p-2" type="submit">Login</button>
      </form>
      <p>{message}</p>
          </div>
    </div>
  );
};

export default Login;
