<!-- eslint-disable -->
<template>
	<nav class="relative bg-[#F2F2F2] w-full shadow-sm flex items-center justify-between px-4 md:px-6 py-3">
		<div class="">
			<div class="block md:hidden mr-2.5" @click="showNav">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20 6L4 6" stroke="#101010" stroke-width="1.5" stroke-linecap="round" />
					<path d="M20 12H12H10M4 12L6 12" stroke="#101010" stroke-width="1.5" stroke-linecap="round" />
					<path d="M20 18H4" stroke="#101010" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</div>
		</div>
		<div class="flex items-center justify-end gap-x-4 w-full">
			<!-- <h3 class="text-xl md:text-2xl font-bold">{{ routeName($route.name) }}</h3> -->
			<div class="flex items-center relative">
				<div
					class="flex items-center justify-center bg-gray-100 rounded-full cursor-pointer px-[6px] py-[5px] gap-x-[10px]"
					@click="isUserModal = !isUserModal"
				>
					<div class="flex items-center justify-center bg-[#ccc] w-[40px] h-[40px] rounded-full">
						<i class="ri-user-3-fill text-base"></i>
					</div>
					<div class="" v-if="user && user.first_name && user.role">
						<p class="text-base font-bold capitalize mb-0 pb-0">{{ user.first_name }}</p>
						<p class="text-xs capitalize mt-0 pt-0">{{ user.role }}</p>
					</div>
				</div>

				<div
					class="absolute top-[55px] left-0 w-full bg-white rounded-sm shadow-md z-[20px]"
					v-if="isUserModal"
				>
					<ul>
						<li
							class="h-[40px] flex items-center text-sm cursor-pointer px-5 hover:cursor-pointer hover:bg-gray-100"
							@click="handleMenuSelect('settings')"
						>
							settings
						</li>
						<li
							class="h-[40px] flex items-center text-sm cursor-pointer hover:cursor-pointer text-red-500 px-5 hover:bg-gray-100"
							@click="handleMenuSelect('logout')"
						>
							Logout
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="f" v-if="isOpen">
			<drawer-vue
				:is-open="isOpen"
				:speed="500"
				@close="isOpen = false"
				backgroundColor="transparent"
				position="left"
				maxWidth="260px"
			>
				<sidebar-nav width="w-full" />
			</drawer-vue>
		</div>
	</nav>
</template>
<script>
import SidebarNav from "./SidebarNav.vue";
import DrawerVue from "../Layouts/Drawer.vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentAdminService } from "../../../services";
import { useUserStore } from "../../../stores/userStore";
import { storeToRefs } from "pinia";
const { user, isSuperAdmin, token } = storeToRefs(useUserStore());

export default defineComponent({
	components: {
		SidebarNav,
		DrawerVue,
	},
	data() {},
	methods: {
		truncate(val) {
			if (val.length > 12) {
				return val.slice(0, 12) + "...";
			}
			return val;
		},
		handleMenuSelect(menu) {
			// console.log(menu, this.isUserModal)
			switch (menu) {
				case "settings":
					this.isUserModal = false;
					this.$router.push("/settings");
					break;
				case "logout":
					this.isUserModal = false;
					this.logout();
					break;

				default:
					break;
			}
		},
	},
	setup() {
		const isOpen = ref(false);
		const route = useRoute();
		const isUserModal = ref(false);
		const router = useRouter()

		function showNav(value) {
			isOpen.value = value;
		}

		function setIsOpen(value) {
			isOpen.value = value;
		}

		function closeModal(value) {
			isOpen.value = value;
		}

		const routeName = (route) => {
			switch (route) {
				default:
					return route;
			}
		};

		const fetchCurrentAdminProfile = async () => {
			try {
				const response = await getCurrentAdminService();
				if (response.status == "success") {
					user.value = response.data;
					if(user.value.role == 'admin') {
						isSuperAdmin.value = false;
					} else {
						isSuperAdmin.value = true;
					}
				}
			} catch (e) {
				console.log(e);
			}
		};

		function logout() {
			token.value = '';
			user.value = {};
			router.replace('/login');
		}

		onMounted(() => {
			fetchCurrentAdminProfile();
		});

		return {
			showNav,
			isOpen,
			setIsOpen,
			closeModal,
			routeName,
			route,
			isUserModal, user, logout
		};
	},
	mounted() {},
});
</script>