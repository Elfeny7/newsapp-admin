import AuthContext from "../context/auth/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <p>Selamat datang, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <Link to="/users" className="text-blue-500 hover:underline">
        User Management
      </Link>
      <br></br>
      <Link to="/categories" className="text-blue-500 hover:underline">
        Category Management
      </Link>
      <br></br>
      <Link to="/news" className="text-blue-500 hover:underline">
        News Management
      </Link>
    </div>
  );
}