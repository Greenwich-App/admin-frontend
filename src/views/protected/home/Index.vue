
<template>
    <div>
        <div class="">
            <div class="mb-[32px]">
                <h4 class="font-semibold text-lg">Welcome back, Admin</h4>
                <p class="text-sm">Manage analytics of the estate.</p>
            </div>

            <div class="grid grid-cols-3 gap-[20px]">
                <div class="w-full h-[120px] bg-white border border-[#ccc] rounded-[8px] p-[20px] flex" v-for="(stat, index) in allStats" :key="index">
                    <div class="flex flex-col justify-between flex-1">
                        <p class="text-base font-medium">{{ stat.name }}</p>
                        <p class="text-3xl font-bold">{{ Number(stat.count).toLocaleString() }}</p>
                    </div>
                    <div class="flex-1 items-center justify-end text-right">
                        <i :class="stat.icon" class="text-[48px] text-green-dark"></i>
                    </div>
                    
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface ResidentStat {
    name: string;
    count: number;
    icon: string;
};
const allStats = ref<ResidentStat[]>([
    {
        name: "Total Registered Resident",
        count: 110,
        icon: "ri-home-8-fill"
    },
    {
        name: "Total Generated codes",
        count: 1215,
        icon: "ri-qr-code-fill"
    },
    {
        name: "Total Visitors",
        count: 21000,
        icon: "ri-group-3-fill"
    }
])
</script>