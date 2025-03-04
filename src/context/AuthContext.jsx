import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const API_URL = "http://localhost:5000/users";

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.get(API_URL);
            console.log("Список пользователей из JSON:", res.data);
    
            const userData = res.data.find(user => user.username === username && user.password === password);
            
            if (userData) {
                console.log("Найден пользователь:", userData);
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                window.location.href = "/profile";
            } else {
                console.log("Пользователь не найден. Проверь username и password.");
                alert("Неправильный логин или пароль");
            }
        } catch (error) {
            console.error("Ошибка входа: ", error);
        }
    };
    

    const register = async (username, password, name, surname) => {
        try {
            const res = await axios.get(`${API_URL}?username=${username}`);

            if (res.data.length > 0) {
                alert("Пользователь с таким логином уже существует");
                window.location.href = "/login";
                return;
            }

            const newUser = { id: Date.now(), username, password, name, surname };
            await axios.post(API_URL, newUser);

            window.location.href = "/login";
        } catch (error) {
            console.error("Ошибка регистрации: ", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    const updateUser = (updatedData) => {
        setUser((prevUser) => {
            const newUser = { ...prevUser, ...updatedData };
            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        });
    };
    

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
