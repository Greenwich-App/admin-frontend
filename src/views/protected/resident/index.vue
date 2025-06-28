<template>
    <div>
        <div class="mb-[32px]">
            <h4 class="font-semibold text-lg">Residents</h4>
            <p class="text-sm">Manage registered residents activities.</p>
        </div>

        <div class="bg-white">

            <div class="p-[20px] border-b flex justify-end">
                <input type="text" class="w-[20%] h-[40px] px-3 border border-[#9F9F9F] text-sm" placeholder="Search...">
            </div>

            <data-table :columns="['Name', 'Phone Number', 'Email Address', 'Block', 'Status', 'Actions']">
                <template v-if="allResidents.length > 0">
                    <tr class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
                        v-for="(resident, index) in allResidents" :key="index">
                        
                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ resident.name }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ resident.phone }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ resident.email }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ resident.block }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            <span class="py-1 px-2 rounded-full text-xs" :class="{
                                'bg-yellow-600 text-white': resident.status == 0,
                                'bg-green-600 text-white': resident.status == 1,
                                'bg-red-600 text-white': resident.status == 2
                            }">{{ resident.status === 0 ? 'Pending' : resident.status === 1 ? 'Approved' : 'Rejected' }}</span>
                        </td>

                        <td class="px-6 py-3 text-base whitespace-nowrap rounded-r-lg hover:cursor-pointer">
                            <button class="mr-[10px] bg-green-600 px-2 py-1 rounded-[4px] text-white" v-if="resident.status == 0 || resident.status == 2">
                                <i class="ri-check-line text-base"></i>
                            </button>

                            <button class="mr-[10px] bg-blue-600 px-2 py-1 rounded-[4px] text-white">
                                <i class="ri-eye-line text-base"></i>
                            </button>

                            <button class="mr-[10px] bg-yellow-600 px-2 py-1 rounded-[4px] text-white">
                                <i class="ri-spam-2-line"></i>
                            </button>

                            <button class="mr-[10px] bg-red-600 px-2 py-1 rounded-[4px] text-white">
                                <i class="ri-delete-bin-line text-base"></i>
                            </button>
                        </td>
                    </tr>
                </template>
                <template v-else-if="loading">
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center">
                            <div class="flex items-center justify-center flex-col mt-10">
                                 <span class="w-[40px] h-[40px] transition-300 border-4 border-t-transparent border-green-dark rounded-full flex animate-spin mb-5"></span>
                                <p class="text-base font-medium">Loading residents...</p>
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
                                <p class="text-base font-medium">No resident found.</p>
                            </div>
                        </td>
                    </tr>
                </template>
            </data-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTable from "@/components/UI/DataTable/DataTable.vue";

type Resident = {
  id: number;
  name: string;
  gender: "Male" | "Female";
  block: string;
  phone: string;
  email: string;
  status: number;
};

const loading = ref(false);

const allResidents = ref<Resident[]>([
  {
    id: 1,
    name: "Adaeze Okafor",
    gender: "Female",
    block: "A1",
    phone: "+2348012345678",
    email: "adaeze.okafor@example.com",
    status: 0
  },
  {
    id: 2,
    name: "Chinedu Obi",
    gender: "Male",
    block: "B2",
    phone: "+2348098765432",
    email: "chinedu.obi@example.com",
    status: 0
  },
  {
    id: 3,
    name: "Fatima Sani",
    gender: "Female",
    block: "C1",
    phone: "+2348033344556",
    email: "fatima.sani@example.com",
    status: 1
  },
  {
    id: 4,
    name: "Tunde Balogun",
    gender: "Male",
    block: "D3",
    phone: "+2348022233445",
    email: "tunde.balogun@example.com",
    status: 2,
  },
  {
    id: 5,
    name: "Ngozi Eze",
    gender: "Female",
    block: "E4",
    phone: "+2348067788990",
    email: "ngozi.eze@example.com",
    status: 0
  }
]
)
</script>