<template>
	<div class="flex">
		<div class="hidden md:block" :class="isSidebar ? 'md:w-[105px]' : 'md:w-[260px]'">
			<sidebar-vue :toggleSidebar="toggleSidebar" :isSidebar="isSidebar" />
		</div>
		<main class="w-full bg-[#F2F2F2]" :class="isSidebar ? 'md:w-[calc(100%_-_105px)]' : 'md:w-[calc(100%_-_260px)]'">
			<top-nav-vue />
			<div class="px-4 md:px-8 py-5" style="min-height: 100vh; height: auto">
				<router-view />
			</div>
		</main>
	</div>
</template>
  
  <script>
import { ref } from "vue";
import TopNavVue from "@/components/UI/Navigation/TopNav.vue";
import SidebarVue from "@/components/UI/Navigation/SidebarNav.vue";

export default {
	name: "DashboardView",
	components: {
		TopNavVue,
		SidebarVue,
	},

	setup() {
		const isSidebar = ref(false);
		const toggleSidebar = () => {
			isSidebar.value = !isSidebar.value;
		};

		return {
			isSidebar,
			toggleSidebar,
		};
	},
};
</script>
  