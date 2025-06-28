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
				<div class="flex items-center justify-center bg-white rounded-full cursor-pointer w-[40px] h-[40px]"
					@click="isUserModal = !isUserModal">
					<div class="flex items-center justify-center">
						<i class="ri-user-3-fill text-base"></i>
					</div>
				</div>

				<div class="absolute top-[55px] left-0 w-full bg-white rounded-2xl shadow-md z-[20px] px-5"
					v-if="isUserModal">
					<ul>
						<li class="h-[40px] flex items-center border-b border-[#9f9f9f] sm-text cursor-pointer hover:cursor-pointer"
							@click="handleMenuSelect('settings')">
							settings
						</li>
						<li class="h-[40px] flex items-center sm-text cursor-pointer hover:cursor-pointer text-red-500"
							@click="handleMenuSelect('logout')">
							Logout
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="f" v-if="isOpen">
			<drawer-vue :is-open="isOpen" :speed="500" @close="isOpen = false" backgroundColor="transparent" position="left"
				maxWidth="260px">
				<sidebar-nav width="w-full" />
			</drawer-vue>
		</div>
	</nav>
</template>
<script>
import SidebarNav from "./SidebarNav.vue";
import DrawerVue from "../Layouts/Drawer.vue";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

// const router = useRouter();

export default defineComponent({
	components: {
		SidebarNav,
		DrawerVue,
	},
	data() {

	},
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
				case 'settings':
					this.isUserModal = false;
					this.$router.push("/settings");
					break;
				case 'logout':
					this.isUserModal = false;
					this.logout();
					break;

				default:
					break;
			}
		}
	},
	setup() {
		const isOpen = ref(false);
		const route = useRoute();
		const isUserModal = ref(false);

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

		return {
			showNav,
			isOpen,
			setIsOpen,
			closeModal,
			routeName,
			route,
			isUserModal
		};
	},
	mounted() {
		// console.log(this.user)
	},
});
</script>