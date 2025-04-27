<template>
  <el-menu
    ellipsis
    :default-openeds="['4']"
    :router="false"
    class="vortexa-menu"
    :mode="isHorizontal ? 'horizontal' : 'vertical'"
    popper-append-to-body
    menu-trigger="click"
    :popper-offset="1"
    popper-class="custom-popper"
  >
    <el-menu-item index="1" :class="verticalMode" @click="goTo('/dashboard')">
      <vortexa-icon name="dashboard" size="19"/>
      <span>Dashboard</span>
    </el-menu-item>

    <el-divider/>

    <el-menu-item index="2" :class="verticalMode" @click="goTo('/account')">
      <vortexa-icon name="social" size="19"/>
      <span>Account</span>
    </el-menu-item>

    <el-menu-item index="3" :class="verticalMode" @click="goTo('/environment')">
      <el-icon>
        <Compass/>
      </el-icon>
      <span>Environment</span>
    </el-menu-item>

    <el-menu-item index="4" :class="verticalMode" @click="goTo('/wallet')">
      <el-icon>
        <Wallet/>
      </el-icon>
      <span>Wallet</span>
    </el-menu-item>

    <el-divider/>

    <el-menu-item index="5" :class="verticalMode" @click="goTo('/script_node')">
      <vortexa-icon name="cluster" size="19"/>
      <span>Node Manage</span>
    </el-menu-item>
    <el-menu-item  index="6" :class="verticalMode" @click="goTo('/script')">
      <vortexa-icon name="robot" size="19"/>
      <span>Bot Manage</span>
    </el-menu-item>

    <el-divider/>

    <el-menu-item index="7" :class="verticalMode" @click="goTo('/setting')">
      <vortexa-icon name="account" size="19"/>
      <span>User</span>
    </el-menu-item>

    <el-menu-item index="8" :class="verticalMode" @click="goTo('/setting')">
      <el-icon>
        <Setting/>
      </el-icon>
      <span>Setting</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {House, User, Setting, Compass, Wallet} from '@element-plus/icons-vue'
import {computed} from 'vue'
import {useRouter} from "vue-router";
import VortexaIcon from "@/components/vortexa-icon.vue";

const props = defineProps<{
  isHorizontal: boolean
}>();

const verticalMode = computed(() => ({
  verticalMode: props.isHorizontal,
}))


const router = useRouter();

const goTo = (path) => {
  router.push('/homepage' + path);
};

</script>

<style>
.vortexa-menu {
  font-family: Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  --el-menu-item-height: 36px;
  --el-menu-sub-item-height: 36px;
  --el-menu-bg-color: transparent;
  --el-menu-active-color: rgb(12, 10, 9);
  --el-menu-text-color: rgb(120, 114, 109);
}

.el-menu.vortexa-menu {
  background-color: transparent;
  border-right: none;
}

.vortexa-menu .el-divider {
  margin: 9px 0;
}

.el-menu-item.is-active {
  background-color:  var(--el-color-success-light-9);
}
</style>
