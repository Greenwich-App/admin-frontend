<template>
	<div class="relative w-full">
		<div
			class="fixed h-[100vh] bg-green-dark text-white shadow-md z-50"
			:class="isSidebar ? 'md:w-[105px]' : 'w-full md:w-[260px]'"
		>
			<div class="py-10 mb-2" :class="isSidebar ? 'px-4' : 'px-10'">
				<img
					alt="greenwich gardens"
					src="@/assets/images/greenwich.svg"
					class="mx-auto h-[60px]"
					v-if="isSidebar"
				/>
				<img alt="greenwich gardens" src="@/assets/images/greenwich.svg" class="mx-auto h-[60px]" v-else />
			</div>

			<div class="flex flex-col px-[20px]">
				<div :class="isSidebar ? 'mini-sidebar' : ''">
					<div class="mb-2.5">
						<router-link to="/">
							<div
								class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
								:class="{ 'bg-green-light text-green-dark': '/' === $route.path }"
							>
								<span :class="{ 'link-active': '/' === $route.path }">
									<i class="ri-dashboard-fill"></i>
								</span>
								<p class="text-base ml-3">Dashboard</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/residence">
							<div
								class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
								:class="{ 'bg-green-light text-green-dark': '/residence' === $route.path }"
							>
								<span :class="{ 'link-active': '/' === $route.path }">
									<i class="ri-home-2-fill"></i>
								</span>
								<p class="text-base ml-3">Residence</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/residents">
							<div
								class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
								:class="{ 'bg-green-light text-green-dark': '/residents' === $route.path }"
							>
								<span :class="{ 'link-active': '/' === $route.path }">
									<i class="ri-user-2-fill"></i>
								</span>
								<p class="text-base ml-3">Residents</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/visitors">
							<div
								class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
								:class="{ 'bg-green-light text-green-dark': '/visitors' === $route.path }"
							>
								<span :class="{ 'link-active': '/' === $route.path }">
									<i class="ri-group-3-fill"></i>
								</span>
								<p class="text-base ml-3">Visitors</p>
							</div>
						</router-link>
					</div>

					<div class="mb-2.5">
						<router-link to="/announcement">
							<div
								class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
								:class="{ 'bg-green-light text-green-dark': '/announcement' === $route.path }"
							>
								<span :class="{ 'link-active': '/' === $route.path }">
									<i class="ri-megaphone-fill"></i>
								</span>
								<p class="text-base ml-3">Announcements</p>
							</div>
						</router-link>
					</div>

					<div v-if="isSuperAdmin">
						<div class="mb-2.5">
							<router-link to="/manage-admin">
								<div
									class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
									:class="{ 'bg-green-light text-green-dark': '/manage-admin' === $route.path }"
								>
									<span :class="{ 'link-active': '/manage-admin' === $route.path }">
										<i class="ri-user-5-fill"></i>
									</span>
									<p class="text-base ml-3">Admin</p>
								</div>
							</router-link>
						</div>

						<div class="mb-2.5">
							<router-link to="/audit-logs">
								<div
									class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
									:class="{ 'bg-green-light text-green-dark': '/audit-logs' === $route.path }"
								>
									<span :class="{ 'link-active': '/audit-logs' === $route.path }">
										<i class="ri-book-fill"></i>
									</span>
									<p class="text-base ml-3">Audit Logs</p>
								</div>
							</router-link>
						</div>

						<div class="mb-2.5">
							<router-link to="/guards">
								<div
									class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
									:class="{ 'bg-green-light text-green-dark': '/guards' === $route.path }"
								>
									<span :class="{ 'link-active': '/guards' === $route.path }">
										<i class="ri-shield-star-fill"></i>
									</span>
									<p class="text-base ml-3">Guards</p>
								</div>
							</router-link>
						</div>

						<div class="mb-2.5">
							<router-link to="/settings">
								<div
									class="flex items-center p-[10px] rounded-[4px] cursor-pointer font-medium"
									:class="{ 'bg-green-light text-green-dark': '/settings' === $route.path }"
								>
									<span :class="{ 'link-active': '/settings' === $route.path }">
										<i class="ri-settings-5-fill"></i>
									</span>
									<p class="text-base ml-3">Settings</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="w-[30px] h-[30px] bg-white hidden md:flex rounded-full items-center justify-center fixed z-[100] top-[20px]"
			:class="isSidebar ? 'left-[90px]' : 'left-[245px]'"
			@click="toggleSidebar()"
		>
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M9.39581 2.69038C9.197 2.49709 8.87466 2.49709 8.67585 2.69038L4.60312 6.64997C4.50765 6.74279 4.45401 6.86869 4.45401 6.99996C4.45401 7.13122 4.50765 7.25712 4.60312 7.34994L8.67585 11.3095C8.87466 11.5028 9.197 11.5028 9.39581 11.3095C9.59462 11.1162 9.59462 10.8029 9.39581 10.6096L5.68307 6.99996L9.39581 3.39034C9.59462 3.19705 9.59462 2.88367 9.39581 2.69038Z"
					fill="#101010"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../../stores/userStore";
import { storeToRefs } from "pinia";
export default {
	name: "SidebarNav",
	props: {
		// width: {
		// 	type: String,
		// 	required: false,
		// 	// default: "w-5/12 md:w-[260px]",
		// },
		toggleSidebar: Function,
		isSidebar: Boolean,
	},
	data() {},
	setup() {
		const { isSuperAdmin } = storeToRefs(useUserStore());

		return {
			isSuperAdmin
		}
	},
};
</script>

<style lang="scss" scoped>
.mini-sidebar {
	a {
		> div {
			border-radius: 50%;
			justify-content: center;
			height: 48px;
			height: 48px;
			padding: 0;

			> p {
				display: none;
			}
		}
	}
}
</style>