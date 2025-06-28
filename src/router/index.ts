import {createRouter, createWebHistory} from "vue-router";
import { publicRoutes } from "../views/public/router";
import { protectedRoutes } from "../views/protected/router";

const routes = [
    ...publicRoutes,
    ...protectedRoutes,
    {
        path: "/:catchAll(.*)",
        component: () => import("@/components/NotFound/Index.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if(!to.meta.middleware) {
        return next();
    }
})

export default router;
