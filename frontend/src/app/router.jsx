// src/app/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/shared";
import { Login } from "@/features/auth"; 
import { UserListPage, UserRegisterForm } from "@/features/users";
const router = createBrowserRouter([
{
    path: "/",
    element: <Navigate to="/auth/login" replace />,
},
{
    path: "/auth",
    element: <AuthLayout />,
    children: [
    {
        path: "login",
        element: <Login />,
        },
    ],
},
{
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
        { path: "userList", element: <UserListPage /> },
        { path: "userCreate", element: <UserRegisterForm /> },
        
        ],
    },
]);

export default router;