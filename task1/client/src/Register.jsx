import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const apiBase="https://shivam.zewaa.com";


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBase}/register`, {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error registering.",error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-8 p-2 border-2 shadow-xl rounded-[1.8rem] px-12 py-[60px]">

      <h2 className="flex justify-center items-center text-center text-bold text-[50px]">Register</h2>
      <form className="flex flex-col gap-4 text-[25px] font-medium" onSubmit={handleRegister}>
        <input className="pl-5 border-2 shadow-xl rounded-[1.8rem]  outline-none  p-2 mb-5"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
        <input className="pl-5 border-2 shadow-xl rounded-[1.8rem]  outline-none  p-2 mb-5"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        <input className="pl-5 border-2 shadow-xl rounded-[1.8rem]  outline-none  p-2 mb-5"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        <button className="border-2 border-black shadow-lg rounded-[1.8rem] px-6 p-2" type="submit">Register</button>
      </form>
      <p>{message}</p>
          </div>
    </div>
  );
};

export default Register;
