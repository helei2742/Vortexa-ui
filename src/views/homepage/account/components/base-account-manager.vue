<script setup lang="ts">
import DynamicAddFieldTable from "@/components/dynamic-add-field-table.vue";
import {ref} from "vue";

const accountBaseInfoList = ref(
  [
    {
      'id': '123123',
      'email': '123213@qq.com',
      'name': '123213',
      'password': '123123123'
    },
    {
      'id': '123123',
      'email': '123213@qq.com',
      'name': '123213',
      'password': '123123123'
    },
    {
      'id': '123123',
      'email': '123213@qq.com',
      'name': '123213',
      'password': '123123123'
    },
    {
      'id': '123123',
      'email': '123213@qq.com',
      'name': '123213',
      'password': '123123123'
    }
  ]
)
</script>

<template>
  <div>
    <dynamic-add-field-table
      :headers="['id', 'name', 'password']"
      id-field="id"
      :data="accountBaseInfoList"
    >
    </dynamic-add-field-table>
  </div>
</template>

<style scoped>

</style>
