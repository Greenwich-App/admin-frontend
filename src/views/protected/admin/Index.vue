<template>
	<div>
		<div class="mb-[32px]">
			<h4 class="font-semibold text-lg">Admin</h4>
			<p class="text-sm">Manage registered admin activities.</p>
		</div>

		<div class="bg-white">
			<div class="p-[20px] border-b flex justify-between">
				<input
					type="text"
					class="w-[20%] h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
					placeholder="Search..."
					v-model="search"
				/>

				<button
					class="w-auto h-[40px] px-3 bg-[#004225] text-white text-sm font-medium rounded-lg"
					@click="showAddMemberModal = true"
				>
					Add Member
				</button>
			</div>

			<data-table :columns="['First Name', 'Last Name', 'Email Address', 'Role', 'Status', 'Actions']">
				<template v-if="allAdmin.length > 0">
					<tr
						class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
						v-for="(admin, index) in allAdmin"
						:key="index"
					>
						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ admin.first_name }}
						</td>

						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ admin.last_name }}
						</td>

						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ admin.email }}
						</td>

						<td class="px-6 py-3 text-sm whitespace-nowrap capitalize">
							{{ admin.role }}
						</td>

						<td class="px-6 py-3 text-sm whitespace-nowrap">
							<span
								class="py-1 px-2 rounded-full text-xs"
								:class="{
									'bg-green-600 text-white': admin.status === 'active',
									'bg-red-600 text-white': admin.status === '',
								}"
							>
								{{ admin.status === 'active' ? "Active" : "Suspended" }}
							</span>
						</td>

						<td class="px-6 py-3 text-base whitespace-nowrap rounded-r-lg hover:cursor-pointer">
							<!-- <button
								class="mr-[10px] bg-green-600 px-2 py-1 rounded-[4px] text-white"
								v-if="admin.status == 'active'"
							>
								<i class="ri-check-line text-base"></i>
							</button> -->

							<button
								class="mr-[10px] bg-yellow-600 px-2 py-1 rounded-[4px] text-white"
								v-if="admin.status == 'active'"
								@click="openSuspendAdminModal(admin)"
							>
								<i class="ri-spam-2-line"></i>
							</button>

							<button
								class="mr-[10px] bg-red-600 px-2 py-1 rounded-[4px] text-white"
								@click="openDeleteAdminModal(admin)"
							>
								<i class="ri-delete-bin-line text-base"></i>
							</button>
						</td>
					</tr>
				</template>
				<template v-else-if="loading">
					<tr>
						<td colspan="5" class="px-6 py-4 text-center">
							<div class="flex items-center justify-center flex-col mt-10">
								<span
									class="w-[40px] h-[40px] transition-300 border-4 border-t-transparent border-green-dark rounded-full flex animate-spin mb-5"
								></span>
								<p class="text-base font-medium">Loading admin...</p>
							</div>
						</td>
					</tr>
				</template>
				<template v-else>
					<tr>
						<td colspan="5" class="px-6 py-4 text-center">
							<div class="flex items-center justify-center flex-col mt-10">
								<p class="">
									<i class="ri-close-circle-line text-[48px]"></i>
								</p>
								<p class="text-base font-medium">No admin found.</p>
							</div>
						</td>
					</tr>
				</template>
			</data-table>
		</div>

		<custom-modal title="Add Member" v-show="showAddMemberModal" @close="showAddMemberModal = false">
			<div class="w-full">
				<form @submit.prevent="addMember">
					<div class="mb-[20px]">
						<label class="text-sm font-medium block mb-1">First Name</label>
						<input
							type="text"
							v-model="newMember.first_name"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							placeholder="Enter name"
							required
						/>
					</div>
					<div class="mb-[20px]">
						<label class="text-sm font-medium block mb-1">Last Name</label>
						<input
							type="text"
							v-model="newMember.last_name"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							placeholder="Enter name"
							required
						/>
					</div>
					<div class="mb-[20px]">
						<label class="text-sm font-medium block mb-1">Email</label>
						<input
							type="email"
							v-model="newMember.email"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							placeholder="Enter email"
							required
						/>
					</div>
					<div class="mb-[20px]">
						<label class="text-sm font-medium block mb-1">Role</label>
						<select
							v-model="newMember.role"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							required
						>
							<option value="">--Select role--</option>
							<option value="admin">Admin</option>
							<option value="security">Security</option>
						</select>
					</div>
					<button
						type="submit"
						class="w-full h-[40px] px-3 bg-[#004225] text-white text-sm font-medium rounded-lg"
						:disabled="adding"
					>
						<span
							v-if="adding"
							class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"
						></span>
						{{adding ? "Creating..." : "Add Member" }}
					</button>
				</form>
			</div>
		</custom-modal>

		<!-- Suspend Admin Modal -->
		<custom-modal title="Suspend Admin" v-show="showSuspendAdminModal" @close="closeSuspendAdminModal">
			<div class="w-full">
				<p class="mb-6 text-base">
					Are you sure you want to suspend <span class="font-semibold">{{ selectedAdmin?.first_name }}</span
					>?
				</p>
				<div class="flex justify-end gap-4">
					<button
						class="h-[40px] px-4 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg"
						@click="closeSuspendAdminModal"
						:disabled="suspending"
					>
						Cancel
					</button>
					<button
						class="h-[40px] px-4 bg-red-600 text-white text-sm font-medium rounded-lg"
						@click="suspendAdmin"
						:disabled="suspending"
					>
						<span
							v-if="suspending"
							class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"
						></span>
						Suspend
					</button>
				</div>
			</div>
		</custom-modal>

		<!-- Delete Admin Modal -->
		<custom-modal title="Delete Admin" v-show="showDeleteAdminModal" @close="closeDeleteAdminModal">
			<div class="w-full">
				<p class="mb-6 text-base">
					Are you sure you want to delete <span class="font-semibold">{{ selectedAdmin?.first_name }}</span
					>? This action cannot be undone.
				</p>
				<div class="flex gap-4 justify-end">
					<button
						class="h-[40px] px-4 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg"
						@click="closeDeleteAdminModal"
						:disabled="deleting"
					>
						Cancel
					</button>
					<button
						class="h-[40px] px-4 bg-red-600 text-white text-sm font-medium rounded-lg"
						@click="deleteAdmin"
						:disabled="deleting"
					>
						<span
							v-if="deleting"
							class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"
						></span>
						Delete
					</button>
				</div>
			</div>
		</custom-modal>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import DataTable from "@/components/UI/DataTable/DataTable.vue";
import CustomModal from "../../../components/UI/Modal/CustomModal.vue";
import {
	allAdminService,
	addAdminService,
	addScurityService,
	removeAdminService,
	removeSecurityService,
} from "../../../services";
import { toast, type ToastOptions } from "vue3-toastify";

interface Admin {
	id?: number;
	first_name: string;
	role?: string;
	last_name: string;
	email: string;
	status?: string;
}

const loading = ref(false);
const search = ref("");

const allAdmin = ref<Admin[]>([]);

const showAddMemberModal = ref(false);

const newMember = ref<Admin>({
	first_name: "",
	role: "",
	last_name: "",
	email: "",
});

const adding = ref(false);

watch(search, (oldVal, newVal) => {
	fetchAllAdmin();
})

const fetchAllAdmin = async () => {
	loading.value = true;
	try {
		const response = await allAdminService(search.value);
		if (response.status == "success") {
			allAdmin.value = response.data.data;
			console.log(response);
		}
		loading.value = false;
	} catch (e) {
		loading.value = false;
		console.log(e);
	}
};

const addMember = async () => {
	adding.value = true;
	const payload = {
		first_name: newMember.value.first_name,
		last_name: newMember.value.last_name,
		email: newMember.value.email,
	};
	try {
		let adminService = newMember.value.role == "admin" ? addAdminService(payload) : addScurityService(payload);
		const response = await adminService;
		adding.value = false;
		if (response.status == "success") {
			toast.success(response.message, {
				autoClose: 1000,
				position: toast.POSITION.TOP_RIGHT,
			} as ToastOptions);
			console.log(response);
		}
		adding.value = false;
		fetchAllAdmin();
	} catch (e) {
		adding.value = false;
		console.log(e);
		toast.error(e.message, {
			autoClose: 1000,
			position: toast.POSITION.TOP_RIGHT,
		} as ToastOptions);
		console.log(e);
	}
}

const showSuspendAdminModal = ref(false);
const showDeleteAdminModal = ref(false);
const selectedAdmin = ref<Admin | null>(null);

const suspending = ref(false);
const deleting = ref(false);

function openSuspendAdminModal(admin: Admin) {
	selectedAdmin.value = admin;
	showSuspendAdminModal.value = true;
}

function closeSuspendAdminModal() {
	showSuspendAdminModal.value = false;
}

function suspendAdmin() {
	if (!selectedAdmin.value) return;
	suspending.value = true;
}

function openDeleteAdminModal(admin: Admin) {
	selectedAdmin.value = admin;
	showDeleteAdminModal.value = true;
}

function closeDeleteAdminModal() {
	showDeleteAdminModal.value = false;
}

const deleteAdmin = async () => {
	if (!selectedAdmin.value) return;
	deleting.value = true;
	try {
		let adminService = selectedAdmin.value.role == "admin" ? removeAdminService(selectedAdmin.value.id) : removeSecurityService(selectedAdmin.value.id);
		const response = await adminService;
		deleting.value = false;
		if (response.status == "success") {
			toast.success(response.message, {
				autoClose: 1000,
				position: toast.POSITION.TOP_RIGHT,
			} as ToastOptions);
			console.log(response);
		}
		deleting.value = false;
		fetchAllAdmin();
	} catch (e) {
		deleting.value = false;
		console.log(e);
		toast.error(e.message, {
			autoClose: 1000,
			position: toast.POSITION.TOP_RIGHT,
		} as ToastOptions);
		console.log(e);
	}
}

onMounted(() => {
	fetchAllAdmin();
});
</script>

<style scoped>
</style>