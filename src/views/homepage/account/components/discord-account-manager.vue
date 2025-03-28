<script setup lang="ts">
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {ref} from "vue";

const discordAccountList = ref([])
</script>

<template>
  <div>
    <dynamic-add-field-table
      :headers="['id', 'name', 'password']"
      id-field="id"
      :data="discordAccountList"
    >
    </dynamic-add-field-table>
  </div>
</template>

<style scoped>

</style>
