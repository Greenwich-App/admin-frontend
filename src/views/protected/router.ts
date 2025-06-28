export const protectedRoutes = [
    {
        path: "/",
        name: "Layout",
        meta: {requiresAuth: true},
        component: () => import("@/components/UI/Layouts/Layout.vue"),
        children: [
            {
                path: "",
                name: "Dashboard",
                component: () => import("@/views/protected/home/Index.vue"),
            },
            {
                path: "/residents",
                name: "Resident",
                component: () => import("@/views/protected/resident/index.vue")
            },
            {
                path: "/visitors",
                name: "Visitor",
                component: () => import("@/views/protected/visitor/index.vue")
            },
            {
                path: "/announcement",
                name: "Announcement",
                component: () => import("@/views/protected/announcement/index.vue")
            },
            {
                path: "/manage-admin",
                name: "ManageAdmin",
                component: () => import("@/views/protected/admin/Index.vue")
            },
            {
                path: "/audit-logs",
                name: "AuditLogs",
                component: () => import("@/views/protected/audit-log/Index.vue")
            },
            {
                path: "/settings",
                name: "Settings",
                component: () => import("@/views/protected/settings/Index.vue")
            },
            {
                path: "/communications",
                name: "Communications",
                component: () => import("@/views/protected/communication/Index.vue")
            },
            {
                path: "/guards",
                name: "Guards",
                component: () => import("@/views/protected/guards/Index.vue")
            }
        ],
    },
];
