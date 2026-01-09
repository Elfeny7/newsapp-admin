import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import User from "@/features/users/pages/User";
import Categories from "@/features/category/pages/Category";
import News from "@/features/news/pages/News";
import NewsDetail from "@/features/news/pages/NewsDetail";
import ProtectedRoute from "@/app/router/ProtectedRoute";
import Sidebar from "@/shared/components/layouts/Sidebar";

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{
        style: {
          fontSize: "20px",
          padding: "18px 26px",
          minWidth: "340px",
          borderRadius: "12px",
        },
      }} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute><Sidebar /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail mode="edit" />} />
          <Route path="/news/create" element={<NewsDetail mode="create" />} />
        </Route>
      </Routes>
    </>
  );

}

export default App;
