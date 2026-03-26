import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

type User = {
    _id: string;
    username: string;
    email: string;
    avatar: string;
};

type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        async function validateSession() {
            try {
                const response = await axios.get("http://localhost:5000/api/users/me", {
                    withCredentials: true,
                });
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } catch {

                localStorage.removeItem("user");
                setUser(null);
            }
        }

        validateSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

