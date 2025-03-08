import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/auth/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const csrf = async () => {
    await authApi.get("/sanctum/csrf-cookie");
  };

  const getUser = async () => {
    try {
      const { data } = await authApi.get("/api/user");
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (e) {
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      await csrf();
      const response = await authApi.post("/login", data);
      console.log(response);
      await getUser();
      navigate("/dashboard");
    } catch (e) {
        console.log(e);
        
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const logout = async () => {
    try {
      await csrf();
      await authApi.post("/logout");
      setUser(null);
      localStorage.removeItem("user"); // Clear user data on logout
      navigate("/login");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  // Fetch user data on app load
  useEffect(() => {
    const fetchUser = async () => {
      await csrf();
      await getUser();
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, errors, loading, getUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}