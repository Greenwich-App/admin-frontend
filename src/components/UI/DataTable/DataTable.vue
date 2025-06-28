<template>
	<div class="overflow-x-scroll h-[55vh]">
		<table class="w-full divide-y divide-gray-200">
			<thead class="bg-white rounded-lg">
				<tr class="bg-white border-spacing-0 border-separate">
					<th
						scope="col"
						class="px-6 py-3 text-sm font-bold text-left text-black capitalize"
						v-for="(col, index) in columns"
						:key="index"
					>
						{{ col }}
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				<slot></slot>
			</tbody>
		</table>
	</div>
</template>
  
  <script>
export default {
	name: "DataTable",
	props: ["columns"],
};
</script>