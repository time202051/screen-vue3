<template>
  <div :class="ns.b()">
    <div :class="ns.b('left')">
      <div :class="ns.bm('left', 'top')">
        <CarBodyStatistics />
      </div>
      <div :class="ns.bm('left', 'center')">
        <ItemWrap
          :class="[ns.e('itemWrap'), ns.m('l')]"
          title="当前车身类型占比"
        >
          <PieCharts :class="ns.em('charts', 'pie')" :data="carPie" />
        </ItemWrap>
        <ItemWrap :class="[ns.e('itemWrap'), ns.m('r')]" title="货位月占用数">
          <AdaptiveChart
            :class="ns.em('charts', 'line')"
            :data="storageLocationLine"
          />
        </ItemWrap>
      </div>
      <div :class="ns.bm('left', 'bottom')">
        <ItemWrap :class="ns.e('itemWrap')" title="货位月占用数">
          <AdaptiveChart
            :class="ns.em('charts', 'line')"
            :data="storageLocationLine"
          />
        </ItemWrap>
      </div>
    </div>
    <div :class="ns.b('right')">
      <div :class="ns.bm('right', 'top')">
        <SmpleStatistics />
      </div>
      <div :class="ns.bm('right', 'center1')">
        <ItemWrap
          :class="[ns.e('itemWrap'), ns.m('r')]"
          title="样件订单处理量趋势"
        >
          <AdaptiveChart
            :class="ns.em('charts', 'line')"
            :data="sampleProcessingVolume"
            :options="sampleOrderFormOptions"
          />
        </ItemWrap>
      </div>
      <div :class="ns.bm('right', 'center2')">
        <ItemWrap
          :class="[ns.e('itemWrap'), ns.m('r')]"
          title="样件出入处数量趋势"
        >
          <AdaptiveChart
            :class="ns.em('charts', 'line')"
            :data="storageLocationLine"
            :options="outInOptions"
          />
        </ItemWrap>
      </div>
      <div :class="ns.bm('right', 'bottom')">
        <ItemWrap
          :class="[ns.e('itemWrap'), ns.bm('right', 'l')]"
          title="堆垛设备实时能耗"
        >
          <EnergyConsumption />
        </ItemWrap>
        <ItemWrap
          :class="[ns.e('itemWrap'), ns.bm('right', 'r')]"
          title="巷道载货率"
        >
          <CargoLoadRate />
        </ItemWrap>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNameSpace } from "@/utils/useNameSpace";
import CarBodyStatistics from "./com/CarBodyStatistics.vue";
import SmpleStatistics from "./com/SmpleStatistics.vue";
import EnergyConsumption from "./com/EnergyConsumption.vue";
import CargoLoadRate from "./com/CargoLoadRate.vue";
import PieCharts from "@/components/echarts/PieCharts.vue";
import AdaptiveChart from "@/components/echarts/AdaptiveChart.vue";

import { onMounted, reactive, ref } from "vue";
import type { IOptionsData, ISeriesItem, IPieItem } from "@/hooks/useECharts";

const ns: any = useNameSpace("mainControlRoom");

const storageLocationLine = ref<IOptionsData>({
  xdata: [],
  series: [],
});
const sampleProcessingVolume = ref<IOptionsData>({
  xdata: [],
  series: [],
});

const carPie = ref<IPieItem[]>([]);
const fetchStorageLocationLine = (): Promise<IOptionsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        xdata: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        series: [
          {
            name: "入库",
            type: "line",
            data: [303, 300, 150, 80, 80, 70, 110, 91, 70, 110, 130, 150],
            color: "#2121b5",
          },
          {
            name: "出库",
            type: "line",
            data: [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 91],
            color: "#a91023",
          },
        ],
      });
    }, 1000);
  });
};

const fetchStorageLocationPie = (): Promise<IPieItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { value: 1048, name: "碰撞车身" },
        { value: 735, name: "加固车身" },
        { value: 580, name: "白色车身" },
      ]);
    }, 1000);
  });
};

const fetchStorageLocationBar = (): Promise<IOptionsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        xdata: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        series: [
          {
            name: "访问量",
            type: "bar",
            data: [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 91],
            color: "#95f204",
            barWidth: 20,
          },
        ],
      });
    }, 1000);
  });
};

const init = () => {
  // 后期接口获取
  fetchStorageLocationLine().then((res) => {
    storageLocationLine.value = res;
  });

  fetchStorageLocationPie().then((res) => {
    carPie.value = res;
  });
  fetchStorageLocationBar().then((res) => {
    sampleProcessingVolume.value = res;
  });
};

onMounted(() => {
  init();
});

const outInOptions = {
  grid: {
    top: "30px",
  },
};
const sampleOrderFormOptions = {
  grid: {
    left: "10px",
    top: "30px",
  },
  yAxis: {
    name: "订单量",
  },
};
</script>
<style lang="scss" scoped>
.sc-mainControlRoom {
  display: flex;
  height: 100%;
  gap: 20px;
  padding-top: 20px;
  height: calc(100% - 40px);

  .sc-mainControlRoom-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
    box-sizing: border-box;
    height: calc(100% - 20px);

    .sc-mainControlRoom-left--top {
    }

    .sc-mainControlRoom-left--center {
      flex: 1;
      display: flex;

      .sc-mainControlRoom--l {
        flex: 4;
      }

      .sc-mainControlRoom--r {
        flex: 7;
        padding: 5px;
      }
    }

    .sc-mainControlRoom-left--bottom {
      flex: 1;
      overflow: hidden;
    }
  }

  .sc-mainControlRoom-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
    box-sizing: border-box;
    height: calc(100% - 20px);

    .sc-mainControlRoom-right--top {
      flex: 0 0 auto;
      /* 高度由内容撑开 */
    }

    .sc-mainControlRoom-right--center1 {
      flex: 1;
      /* 等分剩余高度 */
      overflow: hidden;
      /* 防止内容撑开容器 */
    }

    .sc-mainControlRoom-right--center2 {
      flex: 1;
      /* 等分剩余高度 */
      overflow: hidden;
      /* 防止内容撑开容器 */
    }

    .sc-mainControlRoom-right--bottom {
      flex: 1;
      /* 等分剩余高度 */
      display: flex;
      overflow: hidden;

      /* 防止内容撑开容器 */
      .sc-mainControlRoom-right--l {
        flex: 5;
        overflow: hidden;
      }

      .sc-mainControlRoom-right--r {
        flex: 2;
        overflow: hidden;
      }
    }
  }
}

.sc-mainControlRoom__itemWrap {
  // padding: 20px 10px;
  box-sizing: border-box;
  overflow: hidden;
}

.sc-mainControlRoom--r {
  padding: 5px;
}
</style>
