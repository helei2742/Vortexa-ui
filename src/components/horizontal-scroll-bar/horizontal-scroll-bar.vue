<script setup lang="ts">
import {CaretLeft, CaretRight} from "@element-plus/icons-vue";
import {ref} from "vue";

const props = withDefaults(defineProps<{step:number}>(), {
  step: 50
});

const scrollWrapper = ref(null)

const scrollRight = () => {
  if (scrollWrapper.value) {
    console.log(scrollWrapper.value.scrollLeft)
    scrollWrapper.value.wrapRef.scrollLeft += props.step
  }
}

const scrollLeft = () => {
  if (scrollWrapper.value) {
    scrollWrapper.value.wrapRef.scrollLeft -= props.step
  }
}
</script>

<template>
  <div class="horizontal-scroll-bar">
    <el-icon class="control-left" @click="scrollLeft">
      <CaretLeft/>
    </el-icon>
    <div style="width: calc(100% - 20px)">
      <el-scrollbar ref="scrollWrapper">
        <div  style="display: flex; width: fit-content">
          <slot></slot>
        </div>
      </el-scrollbar>
    </div>
    <el-icon class="control-right" @click="scrollRight">
      <CaretRight/>
    </el-icon>
  </div>
</template>

<style scoped>
.horizontal-scroll-bar {
  height: 100%;
  display: flex;
}

.control-left {
  font-size: 18px;
}

.control-left:hover {
  font-weight: 700;
  font-size: 22px;
  cursor: pointer;
}

.control-right {
  font-size: 18px;
}

.control-right:hover {
  font-weight: 700;
  font-size: 22px;
  cursor: pointer;
}
</style>
