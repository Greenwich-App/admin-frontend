import {createRouter, createWebHistory} from "vue-router";
import {publicRoutes} from "../views/public/router";
import {protectedRoutes} from "../views/protected/router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";
import middlewarePipeline from "./kernel/middlewarePipeline";

const routes = [
    ...publicRoutes,
    ...protectedRoutes,
    {
        path: "/:catchAll(.*)",
        component: () => import("@/components/NotFound/Index.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const middleware = (to.meta.middleware ?? []) as Array<(context: any) => void>;
    if (middleware.length === 0) {
        return next();
    }
    const {token} = storeToRefs(useUserStore());
    const store = token.value;

    const context = {
        to,
        from,
        next,
        store,
    };
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
    });
});
router.onError((error) => {
    if (/loading chunk \d* failed./i.test(error.message)) {
        window.location.reload();
    }
});

export default router;
