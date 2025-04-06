import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const API_URL = "http://localhost:5000/users";

    // Загружаем пользователя по ID при загрузке страницы
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`${API_URL}/${userId}`)
                .then(res => setUser(res.data))
                .catch(err => {
                    console.error("Ошибка при загрузке пользователя:", err);
                    localStorage.removeItem("userId");
                });
        }
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.get(API_URL);
            const userData = res.data.find(
                user => user.username === username && user.password === password
            );

            if (userData) {
                setUser(userData);
                localStorage.setItem("userId", userData.id); // сохраняем только id
                window.location.href = "/profile";
            } else {
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
                return;
            }

            const newUser = {
                id: Date.now(),
                username,
                password,
                name,
                surname,
                avatar: "",
                bio: ""
            };

            await axios.post(API_URL, newUser);
            window.location.href = "/login";
        } catch (error) {
            console.error("Ошибка регистрации: ", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userId");
    };

    const updateUser = async (updatedData) => {
        try {
            const updatedUser = { ...user, ...updatedData };
            await axios.put(`${API_URL}/${user.id}`, updatedUser);
            setUser(updatedUser);
        } catch (error) {
            console.error("Ошибка при обновлении данных:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
