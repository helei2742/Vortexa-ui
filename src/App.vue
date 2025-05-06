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

.fancy-border {
  border: 1px solid #ddd;
  border-radius: 12px;
  background: linear-gradient(145deg, #eff6ed, #e2f0e0); /* 浅绿色渐变背景 */
  box-shadow:
    4px 4px 10px rgba(0, 0, 0, 0.1),   /* 阴影 */
    -4px -4px 10px rgba(255, 255, 255, 0.7); /* 高光 */
  padding: 20px;
  transition: all 0.3s ease;
}
.fancy-border:hover {
  box-shadow:
    2px 2px 8px rgba(0, 0, 0, 0.15),
    -2px -2px 8px rgba(255, 255, 255, 0.6);
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
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
