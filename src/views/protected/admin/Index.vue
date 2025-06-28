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
				/>

				<button
					class="w-auto h-[40px] px-3 bg-[#004225] text-white text-sm font-medium rounded-lg"
					@click="showAddMemberModal = true"
				>
					Add Member
				</button>
			</div>

			<data-table :columns="['Name', 'Phone Number', 'Email Address', 'Role', 'Status', 'Actions']">
				<template v-if="allAdmin.length > 0">
					<tr
						class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
						v-for="(admin, index) in allAdmin"
						:key="index"
					>
						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ admin.name }}
						</td>

						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ admin.phone }}
						</td>

						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ admin.email }}
						</td>

						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ admin.role }}
						</td>

						<td class="px-6 py-3 text-sm whitespace-nowrap">
							<span
								class="py-1 px-2 rounded-full text-xs"
								:class="{
									'bg-green-600 text-white': admin.status === 1,
									'bg-red-600 text-white': admin.status === 0,
								}"
							>
								{{ admin.status === 1 ? "Active" : "Suspended" }}
							</span>
						</td>

						<td class="px-6 py-3 text-base whitespace-nowrap rounded-r-lg hover:cursor-pointer">
							<button
								class="mr-[10px] bg-green-600 px-2 py-1 rounded-[4px] text-white"
								v-if="admin.status == 0"
							>
								<i class="ri-check-line text-base"></i>
							</button>

							<button
								class="mr-[10px] bg-yellow-600 px-2 py-1 rounded-[4px] text-white"
								v-if="admin.status == 1"
								@click="openSuspendAdminModal(admin)"
							>
								<i class="ri-spam-2-line"></i>
							</button>

							<button
								class="mr-[10px] bg-blue-600 px-2 py-1 rounded-[4px] text-white"
								@click="editAdminDetails(admin)"
							>
								<i class="ri-edit-2-fill"></i>
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
						<label class="text-sm font-medium block mb-1">Name</label>
						<input
							type="text"
							v-model="newMember.name"
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
						<label class="text-sm font-medium block mb-1">Phone Number</label>
						<input
							type="text"
							v-model="newMember.phone"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							placeholder="Enter phone number"
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
							<option value="Super Admin">Super Admin</option>
							<option value="Admin">Admin</option>
							<option value="Moderator">Moderator</option>
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
						Add Member
					</button>
				</form>
				<p v-if="addSuccess" class="text-green-600 mt-4">Member added successfully!</p>
				<p v-if="addError" class="text-red-600 mt-4">{{ addError }}</p>
			</div>
		</custom-modal>

		<!-- Edit Admin Modal -->
		<custom-modal title="Edit Admin" v-show="showEditAdminModal" @close="closeEditAdminModal">
			<div class="w-full">
				<form @submit.prevent="updateAdmin">
					<div class="mb-[20px]">
						<label class="text-sm font-medium block mb-1">Name</label>
						<input
							type="text"
							v-model="editMember.name"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							placeholder="Enter name"
							required
						/>
					</div>
					<div class="mb-[20px]">
						<label class="text-sm font-medium block mb-1">Email</label>
						<input
							type="email"
							v-model="editMember.email"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							placeholder="Enter email"
							required
						/>
					</div>
					<div class="mb-[20px]">
						<label class="text-sm font-medium block mb-1">Phone Number</label>
						<input
							type="text"
							v-model="editMember.phone"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							placeholder="Enter phone number"
							required
						/>
					</div>
					<div class="mb-[20px]">
						<label class="text-sm font-medium block mb-1">Role</label>
						<select
							v-model="editMember.role"
							class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg"
							required
						>
							<option value="">--Select role--</option>
							<option value="Super Admin">Super Admin</option>
							<option value="Admin">Admin</option>
							<option value="Moderator">Moderator</option>
						</select>
					</div>
					<button
						type="submit"
						class="w-full h-[40px] px-3 bg-[#004225] text-white text-sm font-medium rounded-lg"
						:disabled="updating"
					>
						<span
							v-if="updating"
							class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"
						></span>
						Update Admin
					</button>
				</form>
				<p v-if="editSuccess" class="text-green-600 mt-4">Admin updated successfully!</p>
				<p v-if="editError" class="text-red-600 mt-4">{{ editError }}</p>
			</div>
		</custom-modal>

		<!-- Suspend Admin Modal -->
		<custom-modal title="Suspend Admin" v-show="showSuspendAdminModal" @close="closeSuspendAdminModal">
			<div class="w-full">
				<p class="mb-6 text-base">
					Are you sure you want to suspend <span class="font-semibold">{{ selectedAdmin?.name }}</span
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
				<p v-if="suspendSuccess" class="text-green-600 mt-4">Admin suspended successfully!</p>
				<p v-if="suspendError" class="text-red-600 mt-4">{{ suspendError }}</p>
			</div>
		</custom-modal>

		<!-- Delete Admin Modal -->
		<custom-modal title="Delete Admin" v-show="showDeleteAdminModal" @close="closeDeleteAdminModal">
			<div class="w-full">
				<p class="mb-6 text-base">
					Are you sure you want to delete <span class="font-semibold">{{ selectedAdmin?.name }}</span
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
				<p v-if="deleteSuccess" class="text-green-600 mt-4">Admin deleted successfully!</p>
				<p v-if="deleteError" class="text-red-600 mt-4">{{ deleteError }}</p>
			</div>
		</custom-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTable from "@/components/UI/DataTable/DataTable.vue";
import CustomModal from "../../../components/UI/Modal/CustomModal.vue";

interface Admin {
	id: number;
	name: string;
	role: string;
	phone: string;
	email: string;
	status: number;
}

const loading = ref(false);

const allAdmin = ref<Admin[]>([
	{
		id: 1,
		name: "Adaeze Okafor",
		role: "Super Admin",
		phone: "+2348012345678",
		email: "adaeze.okafor@example.com",
		status: 1,
	},
	{
		id: 2,
		name: "Chinedu Obi",
		role: "Admin",
		phone: "+2348098765432",
		email: "chinedu.obi@example.com",
		status: 0,
	},
	{
		id: 3,
		name: "Fatima Sani",
		role: "Moderator",
		phone: "+2348033344556",
		email: "fatima.sani@example.com",
		status: 1,
	},
	{
		id: 4,
		name: "Tunde Balogun",
		role: "Admin",
		phone: "+2348022233445",
		email: "tunde.balogun@example.com",
		status: 1,
	},
	{
		id: 5,
		name: "Ngozi Eze",
		role: "Admin",
		phone: "+2348067788990",
		email: "ngozi.eze@example.com",
		status: 0,
	},
]);

const showAddMemberModal = ref(false);

const newMember = ref<Admin>({
	id: 0,
	name: "",
	role: "",
	phone: "",
	email: "",
	status: 1,
});

const adding = ref(false);
const addSuccess = ref(false);
const addError = ref<string | null>(null);

function addMember() {
	adding.value = true;
	addSuccess.value = false;
	addError.value = null;

	setTimeout(() => {
		// Simulate adding member
		allAdmin.value.push({
			...newMember.value,
			id: allAdmin.value.length + 1,
			status: 1,
		});
		adding.value = false;
		addSuccess.value = true;
		// Reset form
		newMember.value = {
			id: 0,
			name: "",
			role: "",
			phone: "",
			email: "",
			status: 1,
		};
		setTimeout(() => {
			showAddMemberModal.value = false;
			addSuccess.value = false;
		}, 1000);
	}, 1000);
}

const showEditAdminModal = ref(false);
const editMember = ref<Admin>({
	id: 0,
	name: "",
	role: "",
	phone: "",
	email: "",
	status: 1,
});
const updating = ref(false);
const editSuccess = ref(false);
const editError = ref<string | null>(null);

function editAdminDetails(admin: Admin) {
	editMember.value = { ...admin };
	showEditAdminModal.value = true;
	editSuccess.value = false;
	editError.value = null;
}

function closeEditAdminModal() {
	showEditAdminModal.value = false;
	editSuccess.value = false;
	editError.value = null;
}

function updateAdmin() {
	updating.value = true;
	editSuccess.value = false;
	editError.value = null;

	setTimeout(() => {
		const idx = allAdmin.value.findIndex((a) => a.id === editMember.value.id);
		if (idx !== -1) {
			allAdmin.value[idx] = { ...editMember.value };
			updating.value = false;
			editSuccess.value = true;
			setTimeout(() => {
				showEditAdminModal.value = false;
				editSuccess.value = false;
			}, 1000);
		} else {
			updating.value = false;
			editError.value = "Admin not found.";
		}
	}, 1000);
}

const showSuspendAdminModal = ref(false);
const showDeleteAdminModal = ref(false);
const selectedAdmin = ref<Admin | null>(null);

const suspending = ref(false);
const suspendSuccess = ref(false);
const suspendError = ref<string | null>(null);

const deleting = ref(false);
const deleteSuccess = ref(false);
const deleteError = ref<string | null>(null);

function openSuspendAdminModal(admin: Admin) {
	selectedAdmin.value = admin;
	showSuspendAdminModal.value = true;
	suspendSuccess.value = false;
	suspendError.value = null;
}

function closeSuspendAdminModal() {
	showSuspendAdminModal.value = false;
	suspendSuccess.value = false;
	suspendError.value = null;
}

function suspendAdmin() {
	if (!selectedAdmin.value) return;
	suspending.value = true;
	suspendSuccess.value = false;
	suspendError.value = null;

	setTimeout(() => {
		const idx = allAdmin.value.findIndex((a) => a.id === selectedAdmin.value?.id);
		if (idx !== -1) {
			allAdmin.value[idx].status = 0;
			suspending.value = false;
			suspendSuccess.value = true;
			setTimeout(() => {
				showSuspendAdminModal.value = false;
				suspendSuccess.value = false;
			}, 1000);
		} else {
			suspending.value = false;
			suspendError.value = "Admin not found.";
		}
	}, 1000);
}

function openDeleteAdminModal(admin: Admin) {
	selectedAdmin.value = admin;
	showDeleteAdminModal.value = true;
	deleteSuccess.value = false;
	deleteError.value = null;
}

function closeDeleteAdminModal() {
	showDeleteAdminModal.value = false;
	deleteSuccess.value = false;
	deleteError.value = null;
}

function deleteAdmin() {
	if (!selectedAdmin.value) return;
	deleting.value = true;
	deleteSuccess.value = false;
	deleteError.value = null;

	setTimeout(() => {
		const idx = allAdmin.value.findIndex((a) => a.id === selectedAdmin.value?.id);
		if (idx !== -1) {
			allAdmin.value.splice(idx, 1);
			deleting.value = false;
			deleteSuccess.value = true;
			setTimeout(() => {
				showDeleteAdminModal.value = false;
				deleteSuccess.value = false;
			}, 1000);
		} else {
			deleting.value = false;
			deleteError.value = "Admin not found.";
		}
	}, 1000);
}
</script>

<style scoped>
</style>