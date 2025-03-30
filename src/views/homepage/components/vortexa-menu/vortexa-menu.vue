<template>
  <el-menu
    ellipsis
    :router="false"
    default-active="/dashboard"
    class="vortexa-menu"
    :mode="isHorizontal ? 'horizontal' : 'vertical'"
    popper-append-to-body
    menu-trigger="click"
    :popper-offset="1"
    popper-class="custom-popper"
  >
    <el-menu-item index="/dashboard" :class="verticalMode" @click="goTo('/dashboard')">
      <el-icon>
        <House/>
      </el-icon>
      <span>Dashboard</span>
    </el-menu-item>

    <el-menu-item index="/account" :class="verticalMode" @click="goTo('/account')">
      <el-icon>
        <User/>
      </el-icon>
      <span>Account</span>
    </el-menu-item>

    <el-menu-item index="/environment" :class="verticalMode" @click="goTo('/environment')">
      <el-icon><Compass /></el-icon>
      <span>Environment</span>
    </el-menu-item>

    <el-menu-item index="/script" :class="verticalMode" @click="goTo('/script')">
      <el-icon>
        <SwitchButton/>
      </el-icon>
      <span>Script</span>
    </el-menu-item>

    <el-menu-item index="/setting" :class="verticalMode" @click="goTo('/setting')">
      <el-icon>
        <Setting/>
      </el-icon>
      <span>Setting</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {House, User, SwitchButton, Setting, Compass} from '@element-plus/icons-vue'
import {computed} from 'vue'
import {useRouter} from "vue-router";

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
}

.el-menu.vortexa-menu {
  background-color: transparent;
  border-right: none;
}

.vortexa-menu > .el-menu-item {
  line-height: 20px;
  height: 36px;
  width: 208px;
  color: rgb(120, 114, 109) !important;
  background-color: transparent;
}

.vortexa-menu > .el-menu-item.verticalMode {
  display: flex;
  flex-direction: column;
  width: fit-content;
}

.el-menu.vortexa-menu > .el-menu-item.is-active {
  color: rgb(12, 10, 9) !important;
}

.el-menu.el-menu--horizontal.vortexa-menu > .el-menu-item.is-active {
  color: rgb(12, 10, 9) !important;
  border-bottom-color: rgb(12, 10, 9) !important;
}

.el-menu.el-menu--horizontal.vortexa-menu {
  display: flex;
  justify-content: center; /* 水平居中 */
}

.vortexa-menu > .el-menu-item:hover {
  background-color: #ecebeb;
  color: rgb(12, 10, 9);
}

.el-menu.el-menu--horizontal.vortexa-menu > .el-menu-item:hover {
  background-color: #ecebeb !important;
  color: rgb(12, 10, 9) !important;
}

.custom-popper {
}
</style>
