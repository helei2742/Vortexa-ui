<script setup lang="ts">
import ContentBlock from "@/components/content-block/content-block.vue";
import {computed, onMounted, ref, type Ref, watch} from "vue";
import {BotLaunchConfig} from "@/types/vortexa-type.ts";
import DynamicRowInputCard
  from "@/views/homepage/components/dynamic-row-input-card.vue";
import {ElMessage} from "element-plus";

const formRef = ref(null)
const customConfigRef = ref(null)

const createForm: Ref<BotLaunchConfig> = ref(new BotLaunchConfig())

const props = defineProps<{
  scriptNodeName: string
  botName: string
}>()

const emit = defineEmits(['create-handle'])

const rules = {
  botKey: [
    { required: true, message: 'botKey can not be empty', trigger: 'blur' },
    { min: 3, max: 36, message: 'botKey length between 3-36 char', trigger: 'blur' },
  ],
  scriptNodeName: [
    { required: true, message: 'scriptNodeName can not be empty', trigger: 'blur' },
  ],
  botName: [
    { required: true, message: 'botName can not be empty', trigger: 'blur' },
  ]
}

const isFormCanBeConfirm = computed(()=>{
  return !!createForm.value.botKey
})

const createBotInstanceHandle = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      createForm.value.customConfig = customConfigRef.value.getKeyValues()
      emit('create-handle', createForm.value)
    } else {
      ElMessage.error({
        message: 'create param validate fail',
        type: 'danger'
      })
      return false
    }
  })
}

onMounted(() => {
  createForm.value.scriptNodeName = props.scriptNodeName
  createForm.value.botName = props.botName
})

watch(
  () => props,
  (newProp) => {
    createForm.value.scriptNodeName = newProp.scriptNodeName
    createForm.value.botName = newProp.botName
  },
  {
    deep: true
  }
)
</script>

<template>
  <content-block>
    <el-form
      ref="formRef"
      class="create-form"
      :model="createForm"
      label-width="auto"
      label-position="left"
      :rules="rules"
    >
      <el-form-item label="scriptNodeName">
        <el-input v-model="createForm.scriptNodeName" disabled/>
      </el-form-item>
      <el-form-item label="botName">
        <el-input v-model="createForm.botName" disabled/>
      </el-form-item>
      <el-form-item label="botKey" prop="botKey">
        <el-input v-model="createForm.botKey" placeholder="Place enter bot key"/>
      </el-form-item>
      <el-form-item label="config">
       <dynamic-row-input-card
         ref="customConfigRef"
         :key-values="createForm.customConfig"
       />
      </el-form-item>

      <el-form-item>
        <div style="text-align: right;width: 100%">
          <el-button type="primary"
                     @click="createBotInstanceHandle"
                     :disabled="!isFormCanBeConfirm"
          >
            Create
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </content-block>
</template>

<style scoped>

</style>
