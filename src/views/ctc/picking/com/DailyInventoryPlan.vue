<script setup lang="ts">
import { leftBottom } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { onMounted, reactive, ref } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 256,
    limitScrollNum: 4,
  },
  scroll: true,
});

const tableData = ref([]);
const getData = () => {
  leftBottom({ limitNum: 20 })
    .then((res) => {
      console.log("左下--设备提醒", res);
      if (res.success) {
        state.list = res.data.list;
      } else {
        ElMessage({
          message: res.msg,
          type: "warning",
        });
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="daily-header-box">
    <div>工作台: 5</div>
    <div>剩余: 5</div>
  </div>

  <ul class="header">
    <li>盘点状态</li>
    <li>盘点单号</li>
    <li>零件编码</li>
    <li>零件名称</li>
    <li>盘点托盘</li>
    <li>项目名称</li>
  </ul>
  <div
    class="left_boottom_wrap beautify-scroll-def"
    :class="{ 'overflow-y-auto': !indexConfig.leftBottomSwiper }"
  >
    <SeamlessScroll
      :list="state.list"
      v-model="state.scroll"
      :singleHeight="state.defaultOption.singleHeight"
      :step="state.defaultOption.step"
      :limitScrollNum="state.defaultOption.limitScrollNum"
      :hover="state.defaultOption.hover"
      :singleWaitTime="state.defaultOption.singleWaitTime"
      :wheel="state.defaultOption.wheel"
      v-if="state.list && state.list.length > 0"
    >
      <!-- 表格内容 -->
      <ul class="body">
        <li v-for="(item, index) in state.list" :key="index" class="row">
          <div>{{ item.countyName }}</div>
          <div>{{ item.cityName }}</div>
          <div>{{ item.cityName }}</div>
          <div>{{ item.cityName }}</div>
          <div>{{ item.cityName }}</div>
          <div>{{ item.createTime }}</div>
        </li>
      </ul>
    </SeamlessScroll>
  </div>
</template>
<style lang="scss" scoped>
.daily-header-box {
  color: var(--text-green-color);
  position: absolute;
  top: 11px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
}

.ul-table {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.header {
  display: flex;
  // background-color: #f5f5f5;
  color: #a3bfdc;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.header li {
  flex: 1;
  padding: 12px;
  text-align: center;
}

.body .row {
  display: flex;
  // border-bottom: 1px solid #ddd;
  color: var(--text-white-color);
}

.body .row:last-child {
  border-bottom: none;
}

.body .row div {
  flex: 1;
  padding: 12px;
  text-align: center;
}
</style>
