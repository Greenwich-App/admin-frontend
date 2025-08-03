<template>
    <div>
        <div class="mb-[32px]">
            <h4 class="font-semibold text-lg">Residence Details</h4>
            <p class="text-sm">Manage registered residence activities.</p>
        </div>

        <div class="bg-white">

            <div class="p-[20px] border-b" v-if="singleResidence">
                <h3 class="font-bold">Name: {{ singleResidence.name }}</h3>
                <h3 class="font-bold">Type: <span class="capitalize">{{ singleResidence.type }}</span></h3>
            </div>

            <data-table :columns="['Name', 'Type', 'Number', 'Actions']">
                <template v-if="singleResidence && singleResidence.units.length > 0">
                    <tr class="bg-white hover:bg-light-yellow border-spacing-0 border-separate my-2.5"
                        v-for="(resident, index) in singleResidence.units" :key="index">
                        
                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ resident.name }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ resident.type }}
                        </td>

                        <td class="px-6 py-3 text-sm whitespace-nowrap">
                            {{ resident.number }}
                        </td>

                        <td class="px-6 py-3 text-base whitespace-nowrap rounded-r-lg hover:cursor-pointer">
                            <!-- <button class="mr-[10px] bg-green-600 px-2 py-1 rounded-[4px] text-white" v-if="resident.status == 0 || resident.status == 2">
                                <i class="ri-check-line text-base"></i>
                            </button> -->

                            <!-- <button class="mr-[10px] bg-blue-600 px-2 py-1 rounded-[4px] text-white" @click="fetchSingleResident(resident.id)">
                                <i class="ri-eye-line text-base"></i>
                            </button> -->

                            <!-- <button class="mr-[10px] bg-yellow-600 px-2 py-1 rounded-[4px] text-white">
                                <i class="ri-spam-2-line"></i>
                            </button>

                            <button class="mr-[10px] bg-red-600 px-2 py-1 rounded-[4px] text-white">
                                <i class="ri-delete-bin-line text-base"></i>
                            </button> -->
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
import { onMounted, ref } from "vue";
import DataTable from "@/components/UI/DataTable/DataTable.vue";
import { getSingleResidenceService } from "../../../services";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = ref(false);

const singleResidence = ref();

const fetchSingleResident = async (id) => {
  loading.value = true
  try {
    const response = await getSingleResidenceService(id);
    if(response.status == 'success') {
        singleResidence.value = response.data;
        console.log(response);
    }
    loading.value = false
  } catch (e) {
    loading.value = false
    console.log(e)
  }
}



onMounted(() => {
    fetchSingleResident(route.params.id);
})
</script>