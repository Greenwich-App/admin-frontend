import {createApp} from "vue";
import {createPinia} from "pinia";
import "./assets/main.css";
import "remixicon/fonts/remixicon.css";
import Vue3Toastify, {type ToastContainerOptions} from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import Aura from "@primeuix/themes/aura";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(createPinia());
app.use(router)
    .use(Vue3Toastify, {
        autoClose: 3000,
    } as ToastContainerOptions)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: false,
            },
        },
    })
    .use(ConfirmationService);

app.mount("#app");
