<template>
  <div>
    <div class="mb-[32px]">
      <h4 class="font-semibold text-lg">Guard Logs</h4>
      <p class="text-sm">Create, manage, and view all security guard activity logs.</p>
    </div>

    <div class="flex gap-x-[20px]">
      <!-- Create Guard Log Form -->
      <div class="w-1/3 bg-white">
        <h4 class="mb-[20px] font-bold border-b py-[20px] px-[20px]">
          {{ editingLog ? "Edit Guard Log" : "Create Guard Log" }}
        </h4>
        <div class="px-[20px]">
          <form @submit.prevent="editingLog ? updateLog() : createLog()">
            <div class="mb-[10px]">
              <label class="text-sm font-medium">Guard Name</label>
              <input
                type="text"
                v-model="form.guardName"
                class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                placeholder="Guard Name"
                required
              />
            </div>
            <div class="mb-[10px]">
              <label class="text-sm font-medium">Date</label>
              <input
                type="date"
                v-model="form.date"
                class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                required
              />
            </div>
            <div class="mb-[10px]">
              <label class="text-sm font-medium">Shift</label>
              <select
                v-model="form.shift"
                class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                required
              >
                <option value="">--Select Shift--</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Night">Night</option>
              </select>
            </div>
            <div class="mb-[10px]">
              <label class="text-sm font-medium">Activity</label>
              <input
                type="text"
                v-model="form.activity"
                class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                placeholder="Activity details"
                required
              />
            </div>
            <div class="mb-[10px]">
              <label class="text-sm font-medium">Remarks</label>
              <input
                type="text"
                v-model="form.remarks"
                class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                placeholder="Remarks"
              />
            </div>
            <button
              class="w-full h-[40px] px-3 bg-[#004225] text-white text-md font-medium mb-[10px]"
              type="submit"
              :disabled="submitting"
            >
              <span v-if="submitting" class="animate-spin mr-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
              {{ editingLog ? "Update Log" : "Create Log" }}
            </button>
            <button
              v-if="editingLog"
              class="w-full h-[40px] px-3 bg-gray-200 text-gray-700 text-md font-medium"
              type="button"
              @click="cancelEdit"
            >
              Cancel
            </button>
            <p v-if="formSuccess" class="text-green-600 mt-4">Log {{ editingLog ? "updated" : "created" }} successfully!</p>
            <p v-if="formError" class="text-red-600 mt-4">{{ formError }}</p>
          </form>
        </div>
      </div>

      <!-- Guard Logs Table -->
      <div class="w-2/3 bg-white">
        <data-table :columns="['Guard Name', 'Date', 'Shift', 'Activity', 'Remarks', 'Actions']">
          <template v-if="guardLogs.length > 0">
            <tr
              class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
              v-for="(log, index) in guardLogs"
              :key="log.id"
            >
              <td class="px-6 py-3 text-sm whitespace-nowrap">
                {{ log.guardName }}
              </td>
              <td class="px-6 py-3 text-sm whitespace-nowrap">
                {{ formatDate(log.date) }}
              </td>
              <td class="px-6 py-3 text-sm whitespace-nowrap">
                {{ log.shift }}
              </td>
              <td class="px-6 py-3 text-sm whitespace-nowrap">
                {{ log.activity }}
              </td>
              <td class="px-6 py-3 text-sm whitespace-nowrap">
                {{ log.remarks }}
              </td>
              <td class="px-6 py-3 text-base whitespace-nowrap rounded-r-lg flex gap-2">
                <button
                  class="bg-blue-600 px-2 py-1 rounded-[4px] text-white"
                  @click="editGuardLog(log)"
                >
                  <i class="ri-edit-2-fill"></i>
                </button>
                <button
                  class="bg-red-600 px-2 py-1 rounded-[4px] text-white"
                  @click="deleteGuardLog(log)"
                >
                  <i class="ri-delete-bin-line"></i>
                </button>
              </td>
            </tr>
          </template>
          <template v-else-if="loading">
            <tr>
              <td colspan="6" class="px-6 py-4 text-center">
                <div class="flex items-center justify-center flex-col mt-10">
                  <span class="w-[40px] h-[40px] transition-300 border-4 border-t-transparent border-green-dark rounded-full flex animate-spin mb-5"></span>
                  <p class="text-base font-medium">Loading guard logs...</p>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="6" class="px-6 py-4 text-center">
                <div class="flex items-center justify-center flex-col mt-10">
                  <p class="">
                    <i class="ri-close-circle-line text-[48px]"></i>
                  </p>
                  <p class="text-base font-medium">No guard logs found.</p>
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

type GuardLog = {
  id: number;
  guardName: string;
  date: string;
  shift: "Morning" | "Afternoon" | "Night";
  activity: string;
  remarks: string;
};

const loading = ref(false);
const submitting = ref(false);
const formSuccess = ref(false);
const formError = ref<string | null>(null);

const guardLogs = ref<GuardLog[]>([
  {
    id: 1,
    guardName: "John Musa",
    date: "2025-06-27",
    shift: "Morning",
    activity: "Patrolled main gate and checked visitor logs.",
    remarks: "No issues reported."
  },
  {
    id: 2,
    guardName: "Emeka Obi",
    date: "2025-06-27",
    shift: "Afternoon",
    activity: "Monitored CCTV and responded to resident queries.",
    remarks: "Assisted a lost visitor."
  },
  {
    id: 3,
    guardName: "Fatima Bello",
    date: "2025-06-26",
    shift: "Night",
    activity: "Secured all entry points and logged vehicle movements.",
    remarks: "All clear."
  }
]);

const form = ref<Omit<GuardLog, "id">>({
  guardName: "",
  date: "",
  shift: "" as "Morning" | "Afternoon" | "Night",
  activity: "",
  remarks: ""
});
const editingLog = ref<GuardLog | null>(null);

function createLog() {
  submitting.value = true;
  formSuccess.value = false;
  formError.value = null;
  setTimeout(() => {
    guardLogs.value.unshift({
      id: Date.now(),
      ...form.value
    });
    submitting.value = false;
    formSuccess.value = true;
    resetForm();
  }, 800);
}

function editGuardLog(log: GuardLog) {
  editingLog.value = log;
  form.value = {
    guardName: log.guardName,
    date: log.date,
    shift: log.shift,
    activity: log.activity,
    remarks: log.remarks
  };
  formSuccess.value = false;
  formError.value = null;
}

function updateLog() {
  if (!editingLog.value) return;
  submitting.value = true;
  formSuccess.value = false;
  formError.value = null;
  setTimeout(() => {
    const idx = guardLogs.value.findIndex(l => l.id === editingLog.value?.id);
    if (idx !== -1) {
      guardLogs.value[idx] = {
        ...guardLogs.value[idx],
        ...form.value
      };
      formSuccess.value = true;
      editingLog.value = null;
      resetForm();
    }
    submitting.value = false;
  }, 800);
}

function cancelEdit() {
  editingLog.value = null;
  resetForm();
}

function deleteGuardLog(log: GuardLog) {
  const idx = guardLogs.value.findIndex(l => l.id === log.id);
  if (idx !== -1) {
    guardLogs.value.splice(idx, 1);
  }
}

function resetForm() {
  form.value = {
    guardName: "",
    date: "",
    shift: "" as "Morning" | "Afternoon" | "Night",
    activity: "",
    remarks: ""
  };
}

function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
</script>