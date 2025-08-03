
<template>
    <div>
        <div class="">
            <div class="mb-[32px]">
                <h4 class="font-semibold text-lg">Welcome back, Admin</h4>
                <p class="text-sm">Manage analytics of the estate.</p>
            </div>

            <div class="grid grid-cols-3 gap-[20px]" v-if="allStats">
                <div class="w-full h-[120px] bg-white border border-[#ccc] rounded-[8px] p-[20px] flex">
                    <div class="flex flex-col justify-between flex-1">
                        <p class="text-base font-medium">Total Residents</p>
                        <p class="text-3xl font-bold">{{ allStats.total_residents }}</p>
                    </div>
                    <div class="flex-1 items-center justify-end text-right">
                        <i class="ri-home-8-fill text-[48px] text-green-dark"></i>
                    </div>
                </div>

                <div class="w-full h-[120px] bg-white border border-[#ccc] rounded-[8px] p-[20px] flex">
                    <div class="flex flex-col justify-between flex-1">
                        <p class="text-base font-medium">Total Access Codes</p>
                        <p class="text-3xl font-bold">{{ allStats.total_access_codes }}</p>
                    </div>
                    <div class="flex-1 items-center justify-end text-right">
                        <i class="ri-qr-code-fill text-[48px] text-green-dark"></i>
                    </div>
                </div>

                <div class="w-full h-[120px] bg-white border border-[#ccc] rounded-[8px] p-[20px] flex">
                    <div class="flex flex-col justify-between flex-1">
                        <p class="text-base font-medium">Total Visitors</p>
                        <p class="text-3xl font-bold">{{ allStats.total_visitor_count }}</p>
                    </div>
                    <div class="flex-1 items-center justify-end text-right">
                        <i class="ri-group-3-fill text-[48px] text-green-dark"></i>
                    </div>
                </div>

                <div class="w-full h-[120px] bg-white border border-[#ccc] rounded-[8px] p-[20px] flex">
                    <div class="flex flex-col justify-between flex-1">
                        <p class="text-base font-medium">Total Admins</p>
                        <p class="text-3xl font-bold">{{ allStats.total_admins }}</p>
                    </div>
                    <div class="flex-1 items-center justify-end text-right">
                        <i class="ri-admin-fill text-[48px] text-green-dark"></i>
                    </div>
                </div>

                <div class="w-full h-[120px] bg-white border border-[#ccc] rounded-[8px] p-[20px] flex">
                    <div class="flex flex-col justify-between flex-1">
                        <p class="text-base font-medium">Total Units</p>
                        <p class="text-3xl font-bold">{{ allStats.total_units}}</p>
                    </div>
                    <div class="flex-1 items-center justify-end text-right">
                        <i class="ri-home-4-fill text-[48px] text-green-dark"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { allStatsService } from "../../../services";

interface ResidentStat {
    name: string;
    count: number;
    icon: string;
};

const loading = ref(false);
const allStats = ref();

const fetchStats = async () => {
  loading.value = true
  try {
    const response = await allStatsService();
    if(response.status == 'success') {
        allStats.value = response.data;
        console.log(response);
    }
    loading.value = false
  } catch (e) {
    loading.value = false
    console.log(e)
  }
}

onMounted(() => {
    fetchStats();
})
</script>