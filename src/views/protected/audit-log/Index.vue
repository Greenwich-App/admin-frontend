<template>
	<div>
		<div class="mb-[32px]">
			<h4 class="font-semibold text-lg">Audit Logs</h4>
			<p class="text-sm">View all admin activity logs.</p>
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
					@click="showExportLogModal = true"
				>
					Export Audit Log
				</button>
			</div>

			<data-table :columns="['Date', 'Admin', 'Action', 'Details']">
				<template v-if="auditLogs.length > 0">
					<tr
						class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
						v-for="(log, index) in auditLogs"
						:key="index"
					>
						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ log.date }}
						</td>
						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ log.admin }}
						</td>
						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ log.action }}
						</td>
						<td class="px-6 py-3 text-sm whitespace-nowrap">
							{{ log.details }}
						</td>
					</tr>
				</template>
				<template v-else-if="loading">
					<tr>
						<td colspan="4" class="px-6 py-4 text-center">
							<div class="flex items-center justify-center flex-col mt-10">
								<span
									class="w-[40px] h-[40px] transition-300 border-4 border-t-transparent border-green-dark rounded-full flex animate-spin mb-5"
								></span>
								<p class="text-base font-medium">Loading audit logs...</p>
							</div>
						</td>
					</tr>
				</template>
				<template v-else>
					<tr>
						<td colspan="4" class="px-6 py-4 text-center">
							<div class="flex items-center justify-center flex-col mt-10">
								<p class="">
									<i class="ri-close-circle-line text-[48px]"></i>
								</p>
								<p class="text-base font-medium">No audit logs found.</p>
							</div>
						</td>
					</tr>
				</template>
			</data-table>
		</div>

		<custom-modal title="Export Audit Log" v-show="showExportLogModal" @close="showExportLogModal = false">
			<div class="w-full">
				<div class="">
					<form action="">
						<div class="mb-[20px]">
							<label for="" class="text-sm font-medium">Export type</label>
							<select class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm rounded-lg">
                                <option value="">--Select export type--</option>
                                <option value="csv">CSV</option>
                                <option value="pdf">PDF</option>
                            </select>
						</div>
					</form>
				</div>

				<button class="w-full h-[40px] px-3 bg-[#004225] text-white text-sm font-medium rounded-lg">
					Export Log
				</button>
			</div>
		</custom-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTable from "@/components/UI/DataTable/DataTable.vue";
import CustomModal from "../../../components/UI/Modal/CustomModal.vue";

type AuditLog = {
	id: number;
	date: string;
	admin: string;
	action: string;
	details: string;
};

const loading = ref(false);

const auditLogs = ref<AuditLog[]>([
	{
		id: 1,
		date: "2025-06-28 09:15",
		admin: "Adaeze Okafor",
		action: "Created User",
		details: "Created new resident account for John Doe",
	},
	{
		id: 2,
		date: "2025-06-28 10:02",
		admin: "Chinedu Obi",
		action: "Updated Profile",
		details: "Updated phone number for Fatima Sani",
	},
	{
		id: 3,
		date: "2025-06-28 11:30",
		admin: "Fatima Sani",
		action: "Suspended User",
		details: "Suspended account for Ngozi Eze",
	},
	{
		id: 4,
		date: "2025-06-28 12:45",
		admin: "Tunde Balogun",
		action: "Deleted User",
		details: "Deleted account for Chinedu Obi",
	},
	{
		id: 5,
		date: "2025-06-28 13:10",
		admin: "Ngozi Eze",
		action: "Restored User",
		details: "Restored account for John Doe",
	},
]);

const showExportLogModal = ref(false);
</script>