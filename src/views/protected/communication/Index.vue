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
              <label class="text-sm font-medium">Message</label>
              <input
                type="text"
                v-model="form.message"
                class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                placeholder="Message"
                required
              />
            </div>
            <div class="mb-[10px]">
              <label class="text-sm font-medium">Posted By</label>
              <input
                type="text"
                v-model="form.postedBy"
                class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                placeholder="Posted By"
                required
              />
            </div>
            <div class="mb-[10px]">
              <label class="text-sm font-medium">Date</label>
              <input
                type="date"
                v-model="form.datePosted"
                class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
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
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button
              class="w-full h-[40px] px-3 bg-[#004225] text-white text-md font-medium mb-[10px]"
              type="submit"
              :disabled="submitting"
            >
              <span v-if="submitting" class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
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
            <p v-if="formSuccess" class="text-green-600 mt-4">Announcement {{ editingAnnouncement ? "updated" : "created" }} successfully!</p>
            <p v-if="formError" class="text-red-600 mt-4">{{ formError }}</p>
          </form>
        </div>
      </div>

      <!-- Announcements Table -->
      <div class="w-2/3 bg-white">
        <data-table :columns="['Title', 'Message', 'Posted By', 'Date', 'Priority', 'Status', 'Actions']">
          <template v-if="announcements.length > 0">
            <tr
              class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
              v-for="(announcement, index) in announcements"
              :key="announcement.id"
            >
              <td class="px-6 py-3 text-sm whitespace-nowrap">
                {{ announcement.title }}
              </td>
              <td class="px-6 py-3 text-sm whitespace-nowrap">
                {{ announcement.message }}
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
                    'text-green-600 font-bold': announcement.priority === 'Low'
                  }"
                >
                  {{ announcement.priority }}
                </span>
              </td>
              <td class="px-6 py-3 text-sm whitespace-nowrap">
                <span
                  :class="{
                    'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full': announcement.status === 'Pending',
                    'bg-green-100 text-green-800 px-2 py-1 rounded-full': announcement.status === 'Approved',
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
                  <span class="w-[40px] h-[40px] transition-300 border-4 border-t-transparent border-green-dark rounded-full flex animate-spin mb-5"></span>
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
import { ref } from "vue";
import DataTable from "@/components/UI/DataTable/DataTable.vue";

type Announcement = {
  id: number;
  title: string;
  message: string;
  postedBy: string;
  datePosted: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Approved";
};

const loading = ref(false);
const submitting = ref(false);
const formSuccess = ref(false);
const formError = ref<string | null>(null);

const announcements = ref<Announcement[]>([
  {
    id: 1,
    title: "Monthly Environmental Sanitation",
    message: "Please be informed that the monthly sanitation will hold on Saturday, June 8th, 2025. All residents are expected to participate.",
    postedBy: "Estate Admin",
    datePosted: "2025-06-01",
    priority: "High",
    status: "Pending"
  },
  {
    id: 2,
    title: "Water Supply Interruption",
    message: "There will be an interruption in water supply on June 6th from 9AM to 2PM due to maintenance work.",
    postedBy: "Facility Manager",
    datePosted: "2025-06-03",
    priority: "Medium",
    status: "Approved"
  },
  {
    id: 3,
    title: "Visitor Registration Update",
    message: "Residents are reminded to always pre-register their visitors to ease entrance at the estate gate.",
    postedBy: "Security Department",
    datePosted: "2025-06-02",
    priority: "Low",
    status: "Pending"
  },
  {
    id: 4,
    title: "Fire Drill Exercise",
    message: "A fire safety drill will be conducted across all blocks on June 10th. Please cooperate with the safety team.",
    postedBy: "Safety Coordinator",
    datePosted: "2025-06-04",
    priority: "High",
    status: "Approved"
  }
]);

const form = ref<Omit<Announcement, "id" | "status"> & { priority: string }>({
  title: "",
  message: "",
  postedBy: "",
  datePosted: "",
  priority: ""
});
const editingAnnouncement = ref<Announcement | null>(null);

function createAnnouncement() {
  submitting.value = true;
  formSuccess.value = false;
  formError.value = null;
  setTimeout(() => {
    announcements.value.unshift({
      id: Date.now(),
      title: form.value.title,
      message: form.value.message,
      postedBy: form.value.postedBy,
      datePosted: form.value.datePosted,
      priority: form.value.priority as "High" | "Medium" | "Low",
      status: "Pending"
    });
    submitting.value = false;
    formSuccess.value = true;
    resetForm();
  }, 800);
}

function editAnnouncement(announcement: Announcement) {
  editingAnnouncement.value = announcement;
  form.value = {
    title: announcement.title,
    message: announcement.message,
    postedBy: announcement.postedBy,
    datePosted: announcement.datePosted,
    priority: announcement.priority
  };
  formSuccess.value = false;
  formError.value = null;
}

function updateAnnouncement() {
  if (!editingAnnouncement.value) return;
  submitting.value = true;
  formSuccess.value = false;
  formError.value = null;
  setTimeout(() => {
    const idx = announcements.value.findIndex(a => a.id === editingAnnouncement.value?.id);
    if (idx !== -1) {
      announcements.value[idx] = {
        ...announcements.value[idx],
        ...form.value,
        priority: form.value.priority as "High" | "Medium" | "Low"
      };
      formSuccess.value = true;
      editingAnnouncement.value = null;
      resetForm();
    }
    submitting.value = false;
  }, 800);
}

function cancelEdit() {
  editingAnnouncement.value = null;
  resetForm();
}

function approveAnnouncement(announcement: Announcement) {
  const idx = announcements.value.findIndex(a => a.id === announcement.id);
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
    message: "",
    postedBy: "",
    datePosted: "",
    priority: ""
  };
}

function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
</script>