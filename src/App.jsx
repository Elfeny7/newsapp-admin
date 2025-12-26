import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Categories from "./pages/Category";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import ProtectedRoute from "./routes/ProtectedRoute";
import SidebarLayout from "./components/SidebarLayout";

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
        <Route element={<ProtectedRoute><SidebarLayout /></ProtectedRoute>}>
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
