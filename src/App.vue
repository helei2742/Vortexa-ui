<script lang="ts" setup>

</script>

<template>
  <div class="APP">
    <router-view/>
  </div>
</template>

<style>
.APP {

}

.button-neutral {
  background-color: #f5f5f5 !important;
  color: #333333 !important;
  border: 1px solid #dcdcdc !important;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.button-neutral:hover {
  background-color: #e0e0e0 !important;
}

.button-morandi {
  background-color: #A3B0A8 !important;
  color: #ffffff !important;
  border: 1px solid #8F9D97 !important;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.button-morandi:hover {
  background-color: #899890 !important;
}

.button-gray {
  background-color: #f0f0f0 !important;
  color: #4a4a4a !important;
  border: 1px solid #d9d9d9 !important;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.button-gray:hover {
  background-color: #e6e6e6 !important;
}
</style>
