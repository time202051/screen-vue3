<template>
  <div :class="ns.b()">
    <div :class="ns.b('table')">
      <ul class="header">
        <li>巷道</li>
        <li>载货率</li>
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
              <div>{{ index + 1 }}</div>
              <div>30%</div>
            </li>
          </ul>
        </SeamlessScroll>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { leftBottom } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { onMounted, reactive, ref } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useNameSpace } from "@/utils/useNameSpace";

const ns: any = useNameSpace("energyConsumption");
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 256,
    limitScrollNum: 5,
  },
  scroll: true,
});

const tableData = ref([]);
const getData = () => {
  leftBottom({ limitNum: 20 })
    .then((res) => {
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

<style lang="scss" scoped>
.left_boottom_wrap {
  overflow: hidden;
  height: calc(100% - 20px);
}

.ul-table {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.header {
  display: flex;
  color: #a3bfdc;
  font-weight: bold;
  font-size: 14px;
  // 第二个li
}

.header li {
  flex: 1;
  // padding: 12px;
  text-align: center;
  white-space: nowrap;
  padding-bottom: 5px;
}

.header {
  .index {
    width: 30px;
  }
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
  padding: 2px;
  text-align: center;
  font-size: 14px;
}

.sc-energyConsumption {
  height: 100%;
  overflow: hidden;
  display: flex;

  .sc-energyConsumption-table {
    flex: 1;
  }

  .sc-energyConsumption-charts {
    flex: 2;
  }
}

.index {
  width: 10px !important;
}
</style>
