export const publicRoutes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/public/auth/LoginPage.vue")
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("@/views/public/auth/ForgotPassword.vue")
    }
]