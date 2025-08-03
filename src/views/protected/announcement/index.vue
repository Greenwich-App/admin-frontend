<template>
	<div>
		<div class="mb-[32px]">
			<h4 class="font-semibold text-lg">Announcements</h4>
			<p class="text-sm">Manage messages sent to residents.</p>
		</div>

		<div class="flex gap-x-[20px]">
			<!-- Create/Edit Announcement Form -->
			<div class="w-1/3 bg-white">
				<h4 class="mb-[20px] font-bold border-b py-[20px] px-[20px]">
					{{ editingAnnouncement ? "Edit Announcement" : "Create Announcement" }}
				</h4>
				<div class="px-[20px]">
					<form @submit.prevent="editingAnnouncement ? updateAnnouncement() : createAnnouncement()">
						<div class="mb-[10px]">
							<label class="text-sm font-medium">Title</label>
							<input
								type="text"
								v-model="form.title"
								class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
								placeholder="Title"
								required
							/>
						</div>
						<div class="mb-[10px]">
							<label class="text-sm font-medium">content</label>
							<input
								type="text"
								v-model="form.content"
								class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
								placeholder="content"
								required
							/>
						</div>
						<div class="mb-[10px]">
							<label class="text-sm font-medium">Priority</label>
							<select
								v-model="form.priority"
								class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
								required
							>
								<option value="">--Select Priority--</option>
								<option value="high">High</option>
								<option value="mid">Medium</option>
								<option value="low">Low</option>
							</select>
						</div>
						<div class="mb-[10px]">
							<label class="text-sm font-medium">Status</label>
							<select
								v-model="form.status"
								class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
								required
							>
								<option value="">--Select Status--</option>
								<option value="draft">Draft</option>
								<option value="pending">Pending</option>
								<option value="posted">Posted</option>
							</select>
						</div>
						<button
							class="w-full h-[40px] px-3 bg-[#004225] text-white text-md font-medium mb-[10px]"
							type="submit"
							:disabled="submitting"
						>
							<span
								v-if="submitting"
								class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"
							></span>
							{{ editingAnnouncement ? "Update Announcement" : "Create Announcement" }}
						</button>
						<button
							v-if="editingAnnouncement"
							class="w-full h-[40px] px-3 bg-gray-200 text-gray-700 text-md font-medium"
							type="button"
							@click="cancelEdit"
						>
							Cancel
						</button>
					</form>
				</div>
			</div>

			<!-- Announcements Table -->
			<div class="w-2/3 bg-white">
				<data-table :columns="['Title', 'content', 'Posted By', 'Date', 'Priority', 'Status', 'Actions']">
					<template v-if="announcements.length > 0">
						<tr
							class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
							v-for="(announcement, index) in announcements"
							:key="index"
						>
							<td class="px-6 py-3 text-sm whitespace-nowrap">
								{{ announcement.title }}
							</td>
							<td class="px-6 py-3 text-sm whitespace-nowrap">
								{{ announcement.content }}
							</td>
							<td class="px-6 py-3 text-sm whitespace-nowrap">
								{{ announcement.postedBy }}
							</td>
							<td class="px-6 py-3 text-sm whitespace-nowrap">
								{{ formatDate(announcement.datePosted) }}
							</td>
							<td class="px-6 py-3 text-sm whitespace-nowrap">
								<span
									:class="{
										'text-red-600 font-bold': announcement.priority === 'High',
										'text-yellow-600 font-bold': announcement.priority === 'Medium',
										'text-green-600 font-bold': announcement.priority === 'Low',
									}"
								>
									{{ announcement.priority }}
								</span>
							</td>
							<td class="px-6 py-3 text-sm whitespace-nowrap">
								<span
									:class="{
										'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full':
											announcement.status === 'Pending',
										'bg-green-100 text-green-800 px-2 py-1 rounded-full':
											announcement.status === 'Approved',
									}"
								>
									{{ announcement.status }}
								</span>
							</td>
							<td class="px-6 py-3 text-base whitespace-nowrap rounded-r-lg flex gap-2">
								<button
									class="bg-blue-600 px-2 py-1 rounded-[4px] text-white"
									@click="editAnnouncement(announcement)"
								>
									<i class="ri-edit-2-fill"></i>
								</button>
								<button
									class="bg-green-600 px-2 py-1 rounded-[4px] text-white"
									v-if="announcement.status === 'Pending'"
									@click="approveAnnouncement(announcement)"
								>
									<i class="ri-check-line"></i>
								</button>
								<button
									class="bg-[#004225] px-2 py-1 rounded-[4px] text-white"
									v-if="announcement.status === 'Approved'"
									@click="sendAnnouncement(announcement)"
								>
									<i class="ri-send-plane-2-line"></i>
								</button>
							</td>
						</tr>
					</template>
					<template v-else-if="loading">
						<tr>
							<td colspan="7" class="px-6 py-4 text-center">
								<div class="flex items-center justify-center flex-col mt-10">
									<span
										class="w-[40px] h-[40px] transition-300 border-4 border-t-transparent border-green-dark rounded-full flex animate-spin mb-5"
									></span>
									<p class="text-base font-medium">Loading announcements...</p>
								</div>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr>
							<td colspan="7" class="px-6 py-4 text-center">
								<div class="flex items-center justify-center flex-col mt-10">
									<p class="">
										<i class="ri-close-circle-line text-[48px]"></i>
									</p>
									<p class="text-base font-medium">No announcement found.</p>
								</div>
							</td>
						</tr>
					</template>
				</data-table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DataTable from "@/components/UI/DataTable/DataTable.vue";
import {
	allAnnouncementService,
	createAnnouncementService,
	updateAnnouncementService,
	deleteAnnouncementService,
	postAnnouncementService,
} from "../../../services";
import { toast, type ToastOptions } from "vue3-toastify";

type Announcement = {
	id?: number;
	title: string;
	content: string;
	priority: string;
	status: string;
};

const loading = ref(false);
const submitting = ref(false);
const formSuccess = ref(false);
const formError = ref<string | null>(null);

const announcements = ref<Announcement[]>([]);

const form = ref<Announcement>({
	title: "",
	content: "",
	priority: "",
	status: "",
});
const editingAnnouncement = ref<Announcement | null>(null);

const fetchAllAnnouncement = async () => {
	loading.value = true;
	try {
		const response = await allAnnouncementService();
		if (response.status == "success") {
			announcements.value = response.data.data;
			console.log(response);
		}
		loading.value = false;
	} catch (e) {
		loading.value = false;
		console.log(e);
	}
};

const createAnnouncement = async () => {
	submitting.value = true;
	try {
		const response = await createAnnouncementService(form.value);
		if (response.status == "success") {
			toast.success(response.message, {
				autoClose: 1000,
				position: toast.POSITION.TOP_RIGHT,
			} as ToastOptions);
			console.log(response);
		}
		submitting.value = false;
		resetForm();
        fetchAllAnnouncement();
	} catch (e) {
		submitting.value = false;
		console.log(e);
	}
	setTimeout(() => {
		submitting.value = false;
		formSuccess.value = true;
	}, 800);
};

function editAnnouncement(announcement: Announcement) {
	editingAnnouncement.value = announcement;
	form.value = {
		title: announcement.title,
		content: announcement.content,
		priority: announcement.priority,
		status: announcement.status,
	};
}

function updateAnnouncement() {
	if (!editingAnnouncement.value) return;
	submitting.value = true;
	formSuccess.value = false;
	formError.value = null;

	resetForm();
}

function cancelEdit() {
	editingAnnouncement.value = null;
	resetForm();
}

function approveAnnouncement(announcement: Announcement) {
	const idx = announcements.value.findIndex((a) => a.id === announcement.id);
	if (idx !== -1) {
		announcements.value[idx].status = "Approved";
	}
}

function sendAnnouncement(announcement: Announcement) {
	// Simulate sending out to all individuals
	alert(`Announcement "${announcement.title}" sent to all individuals.`);
}

function resetForm() {
	form.value = {
		title: "",
		content: "",
		postedBy: "",
		priority: "",
	};
}

function formatDate(date: string) {
	if (!date) return "";
	const d = new Date(date);
	return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

onMounted(() => {
	fetchAllAnnouncement();
});
</script>