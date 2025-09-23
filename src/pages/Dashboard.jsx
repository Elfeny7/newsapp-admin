import AuthContext from "../context/authtemp/AuthContext";
import { useContext } from "react";

export default function Dashboard() {
  const { user} = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <p>Selamat datang, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}