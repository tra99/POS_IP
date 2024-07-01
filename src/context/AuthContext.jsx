import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken"),
    profile: JSON.parse(localStorage.getItem("profile")),
  });

  const login = async (phone, password) => {
    try {
      const response = await axios.post("/api/auth/login", { phone, password });
      if (response.status === 200 || response.status === 201) {
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        setAuth((prevAuth) => ({ ...prevAuth, accessToken }));

        const profileResponse = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = profileResponse.data;
        localStorage.setItem("profile", JSON.stringify(profile));
        setAuth((prevAuth) => ({ ...prevAuth, profile }));

        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profile");
    setAuth({ accessToken: null, profile: null });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.accessToken) {
        try {
          const profileResponse = await axios.get("/api/auth/profile", {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          });
          const profile = profileResponse.data;
          localStorage.setItem("profile", JSON.stringify(profile));
          setAuth((prevAuth) => ({ ...prevAuth, profile }));
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          logout();
        }
      }
    };
    fetchProfile();
  }, [auth.accessToken]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
