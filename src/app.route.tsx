import { createBrowserRouter, Navigate } from "react-router"

import { DashboardPage } from "./admin/pages/dashboard/DashboardPage"
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage"
import { ShopLayout } from "./shop/layouts/ShopLayout"
import { GenderPage } from "./shop/pages/gender/GenderPage"
import { HomePage } from "./shop/pages/home/HomePage"
import { ProductPage } from "./shop/pages/product/ProductPage"
import { LoginPage } from "./auth/pages/login/LoginPage"
import { RegisterPage } from "./auth/pages/register/RegisterPage"
import { AdminProductPage } from "./admin/pages/product/AdminProductPage"
import { lazy } from "react";
import { AdminRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";


const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layout/AdminLayout'));


export const appRouter = createBrowserRouter([
    //public routes
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            }, {
                path: 'product/:idSlug',
                element: <ProductPage />
            }, {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]
    },

    //Auth routes
    {
        path: '/auth',
        element: (
            <NotAuthenticatedRoute>
                <AuthLayout />
            </NotAuthenticatedRoute>
        ),
        children: [{
            index: true,
            element: <Navigate to='/auth/login' />
        },
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'register',
            element: <RegisterPage />
        }
        ]
    },

    //Admin routes
    {
        path: '/admin',
        element: (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'products',
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            },
            {
                path: '*',
                element: <Navigate to='/' />
            }
        ]
    }
]);


