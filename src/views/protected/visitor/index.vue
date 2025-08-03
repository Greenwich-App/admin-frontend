<template>
    <div>
        <div class="mb-[32px]">
            <h4 class="font-semibold text-lg">Visitors</h4>
            <p class="text-sm">Manage visitors activities.</p>
        </div>

        <div class="bg-white">

            <div class="p-[20px] border-b flex justify-end">
                <input type="text" class="w-[20%] h-[40px] px-3 border border-[#9F9F9F] text-sm" placeholder="Search...">
            </div>

            <data-table :columns="['Name', 'Phone Number', 'Time In', 'Block', 'Status']">
                <template v-if="visitors && visitors.length > 0">
                    <tr class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
                        v-for="(visitor, index) in visitors" :key="index">
                        
                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ visitor.name }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ visitor.phone }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ formatIsoToDateTime(visitor.timeIn) }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ visitor.block }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            <span class="py-1 px-2 rounded-full text-xs" :class="{
                                'bg-green-600 text-white': visitor.status == 'active',
                                'bg-red-600 text-white': visitor.status == 'expired'
                            }">{{ visitor.status == 'active' ? 'Active' : 'Expired' }}</span>
                        </td>
                    </tr>
                </template>
                <template v-else-if="loading">
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center">
                            <div class="flex items-center justify-center flex-col mt-10">
                                 <span class="w-[40px] h-[40px] transition-300 border-4 border-t-transparent border-green-dark rounded-full flex animate-spin mb-5"></span>
                                <p class="text-base font-medium">Loading visitors...</p>
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
                                <p class="text-base font-medium">No visitor found.</p>
                            </div>
                        </td>
                    </tr>
                </template>
            </data-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DataTable from "@/components/UI/DataTable/DataTable.vue";
import { formatIsoToDateTime } from "../../../helpers";
import { allVisitorsService } from "../../../services";

type Visitor = {
  id: number;
  name: string;
  gender: "Male" | "Female";
  phone: string;
  purpose: string;
  visiting: string;
  block: string;
  timeIn: string;
  timeOut: string | null;
  status: string;
};

const loading = ref(false);

const visitors = ref<Visitor[]>([]);

const fetchAllVisitors = async () => {
  loading.value = true
  try {
    const response = await allVisitorsService();
    loading.value = false
    if(response.status == 'success') {
        visitors.value = response.data.data;
        console.log(response);
    }
    loading.value = false
  } catch (e) {
    loading.value = false
    console.log(e)
  }
}

onMounted(() => {
    fetchAllVisitors();
})
</script>