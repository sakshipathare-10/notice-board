import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
const Login = ({ setIsAdmin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {

  try {

    await signInWithEmailAndPassword(
      auth,
      user,
      pass
    );

    setIsAdmin(true);

    alert("Login successful");

  } catch (error) {

    alert(error.message);
  }
};
  return (
    <form
  onSubmit={(e) => {
    e.preventDefault();
    handleLogin();
  }}
  className="bg-white p-6 rounded-xl shadow-md"
>
      <h2 className="text-lg font-semibold mb-2">Admin Login</h2>

      <input
        placeholder="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <button type="submit"
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </form>
  );
};

export default Login;