import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Categories from "./pages/Category";
import News from "./pages/News";
import ProtectedRoute from "./routes/ProtectedRoute";
import SidebarLayout from "./components/SidebarLayout";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <Dashboard />
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );

}

export default App;
