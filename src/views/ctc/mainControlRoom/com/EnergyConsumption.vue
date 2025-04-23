<template>
  <div :class="ns.b()">
    <div :class="ns.b('table')">
      <ul class="header">
        <li :style="{ width: '30px' }">编号</li>
        <li :style="{ width: '150px' }">吸取/馈电(KW)</li>
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
              <div :style="{ width: '30px' }">{{ index + 1 }}</div>
              <div :style="{ width: '150px' }">
                <span :style="{ color: '#b5f222' }">20</span>
                <span>/</span>

                <span :style="{ color: '#ccbcff' }">30</span>
              </div>
            </li>
          </ul>
        </SeamlessScroll>
      </div>
    </div>
    <AdaptiveChart
      :class="ns.b('charts')"
      :data="barData"
      :options="energyConsumptionOptions"
    />
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
import type { IOptionsData, ISeriesItem, IPieItem } from "@/hooks/useECharts";
import AdaptiveChart from "@/components/echarts/AdaptiveChart.vue";

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

const barData = ref<IOptionsData>({
  xdata: [],
  series: [],
});

const barApi = (): Promise<IOptionsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        xdata: ["01", "02", "03", "04"],
        series: [
          {
            name: "吸电",
            type: "bar",
            data: [303, 300, 150, 80],
            color: "#2121b5",
          },
          {
            name: "馈电",
            type: "bar",
            data: [70, 110, 130, 150],
            color: "#a91023",
          },
        ],
      });
    }, 1000);
  });
};

const energyConsumptionOptions = {
  grid: {
    left: "20px",
    right: "65px",
    top: "30px",
  },
  xAxis: {
    name: "堆垛机编号",
    nameTextStyle: {
      padding: [8, -48, 0, 0],
    },
  },
  yAxis: {
    name: "能耗(kW)",
  },
};
onMounted(() => {
  getData();
  barApi().then((res) => {
    barData.value = res;
  });
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
  // flex: 1;
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
  // flex: 1;
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
