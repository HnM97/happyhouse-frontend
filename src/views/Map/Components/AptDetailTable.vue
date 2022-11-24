<script setup>
defineProps({
  headers: {
    type: Array,
    default: () => ["아파트이름", "거래일시", "거래금액", "면적"],
  },
  rows: {
    type: Array,
    required: true,
    apartmentName: String,
    dealAmount: String,
    area: String,
    ymd: String,
  },
});
</script>
<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                v-for="(header, index) in headers"
                :key="header"
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="({ apartmentName, dealAmount, area, ymd }, index) of rows" :key="index">
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ apartmentName }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ ymd }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ dealAmount }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ area }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
