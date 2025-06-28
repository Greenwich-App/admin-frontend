<template>
    <div>
        <div class="mb-[32px]">
            <h4 class="font-semibold text-lg">Announcements</h4>
            <p class="text-sm">Manage messages sent to residents.</p>
        </div>
        
        <div class="flex gap-x-[20px]">
            <div class="w-1/3 bg-white">
                <h4 class="mb-[20px] font-bold border-b py-[20px] px-[20px]">Create Announcement</h4>
                
                <div class="px-[20px]">
                    <div class="mb-[10px]">
                        <label for="" class="text-sm font-medium">Title</label>
                        <input
                        type="text"
                        class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                        placeholder="Title"
                        />
                    </div>
                    
                    <div class="mb-[10px]">
                        <label for="" class="text-sm font-medium">Message</label>
                        <input
                        type="text"
                        class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                        placeholder="Message"
                        />
                    </div>
                    
                    <div class="mb-[10px]">
                        <label for="" class="text-sm font-medium">Posted By</label>
                        <input
                        type="text"
                        class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                        placeholder="Posted By"
                        />
                    </div>
                    
                    <div class="mb-[20px]">
                        <label for="" class="text-sm font-medium">Date</label>
                        <input
                        type="date"
                        class="w-full h-[40px] px-3 border border-[#9F9F9F] text-sm"
                        placeholder="Title"
                        />
                    </div>
                    
                    <button
                    class="w-full h-[40px] px-3 bg-[#004225] text-white text-md font-medium mb-[30px]"
                    type="submit"
                    >
                    Create Announcement
                </button>
            </div>
        </div>
        
        <div class="w-2/3 bg-white">
            <data-table :columns="['Title', 'Message', 'Posted By', 'Date']">
                <template v-if="announcements.length > 0">
                    <tr class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
                    v-for="(resident, index) in announcements" :key="index">
                    
                    <td class="px-6 py-3 text-sm whitespace-nowrap">
                        {{ resident.title }}
                    </td>
                    
                    <td class="px-6 py-3 text-sm whitespace-nowrap">
                        {{ resident.message }}
                    </td>
                    
                    <td class="px-6 py-3 text-sm whitespace-nowrap">
                        {{ resident.postedBy }}
                    </td>
                    
                    <td class="px-6 py-3 text-sm whitespace-nowrap">
                        {{ resident.datePosted }}
                    </td>
                </tr>
            </template>
            <template v-else-if="loading">
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center">
                        <div class="flex items-center justify-center flex-col mt-10">
                            <span class="w-[40px] h-[40px] transition-300 border-4 border-t-transparent border-green-dark rounded-full flex animate-spin mb-5"></span>
                            <p class="text-base font-medium">Loading announcements...</p>
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
};

const loading = ref(false);
const announcements = ref<Announcement[]>([
{
    id: 1,
    title: "Monthly Environmental Sanitation",
    message: "Please be informed that the monthly sanitation will hold on Saturday, June 8th, 2025. All residents are expected to participate.",
    postedBy: "Estate Admin",
    datePosted: "2025-06-01T10:00:00Z",
    priority: "High"
},
{
    id: 2,
    title: "Water Supply Interruption",
    message: "There will be an interruption in water supply on June 6th from 9AM to 2PM due to maintenance work.",
    postedBy: "Facility Manager",
    datePosted: "2025-06-03T15:30:00Z",
    priority: "Medium"
},
{
    id: 3,
    title: "Visitor Registration Update",
    message: "Residents are reminded to always pre-register their visitors to ease entrance at the estate gate.",
    postedBy: "Security Department",
    datePosted: "2025-06-02T08:45:00Z",
    priority: "Low"
},
{
    id: 4,
    title: "Fire Drill Exercise",
    message: "A fire safety drill will be conducted across all blocks on June 10th. Please cooperate with the safety team.",
    postedBy: "Safety Coordinator",
    datePosted: "2025-06-04T07:20:00Z",
    priority: "High"
}
])
</script>