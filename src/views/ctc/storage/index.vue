<template>
  <div :class="ns.b()">
    <div :class="ns.b('left')">
      <div :class="ns.be('left', 'top')">
        <ItemWrap :class="ns.e('itemWrap')">
          <div :class="ns.be('left', 'container')">
            <div :class="ns.bem('left', 'text', 'type')">
              任务类型：<span>入库</span>
            </div>
            <div :class="ns.bem('left', 'text', 'tuopan')">
              正在入库母托盘：<span>{{ palletSortCount.tvCode }}</span>
            </div>

            <div :class="ns.be('left', 'topItemBox')">
              <div>
                当天组盘托数：<span>{{ palletSortCount.palletSortCount }}</span>
              </div>
              <div>
                组盘已入：<span>{{ palletSortCount.inCount }}</span>
              </div>
              <div>
                组盘未入：<span :class="ns.bem('left', 'text', 'not-in')">{{
                  palletSortCount.notInCount
                }}</span>
              </div>
            </div>
          </div>
        </ItemWrap>
      </div>
      <div :class="ns.bm('left', 'bottom')">
        <ItemWrap :class="ns.e('itemWrap')" title="当前托盘异常信息">
          <!-- <div :class="ns.b('errorText')">⚠️当前入库托盘超高/超重！</div> -->
          <ErrorCarousel :errors />
        </ItemWrap>
      </div>
    </div>
    <div :class="ns.b('right')">
      <div :class="ns.bm('right', 'top')">
        <ItemWrap :class="ns.e('itemWrap')">
          <div :class="ns.be('right', 'container')">
            <div>
              <!-- 添加img/sample.png -->
              <img
                src="@/assets/img/sample.png"
                alt="sample"
                width="35"
                height="30"
              />
              <div>
                样件--总库容：{{ availableCargoLocation.samplePercent }}
              </div>
            </div>
            <div>
              <svg width="35" height="30">
                <g transform="matrix(1 0 0 1 -1043 -131 )">
                  <path
                    d="M 28.0625 14  L 28.5 14  C 29.468750000000004 14  30.294270833333336 14.34114583333333  30.9765625 15.0234375  C 31.658854166666668 15.705729166666664  32 16.53125  32 17.5  L 32 23.5  C 32 23.645833333333332  31.953125 23.765625  31.859375 23.859375  C 31.765625 23.953125  31.645833333333336 24  31.5 24  L 30 24  L 30 25  C 30.000000000000004 25.833333333333332  29.708333333333336 26.541666666666668  29.125 27.125  C 28.541666666666668 27.708333333333332  27.833333333333336 28  27 28  C 26.166666666666668 28  25.458333333333336 27.708333333333332  24.875 27.125  C 24.291666666666664 26.541666666666668  24 25.833333333333332  24 25  L 24 24  L 8 24  L 8 25  C 8 25.833333333333332  7.708333333333334 26.541666666666668  7.125 27.125  C 6.541666666666667 27.708333333333332  5.833333333333334 28  5 28  C 4.166666666666667 28  3.458333333333334 27.708333333333332  2.875 27.125  C 2.291666666666667 26.541666666666668  2 25.833333333333332  2 25  L 2 24  L 0.5 24  C 0.3541666666666667 24  0.23437500000000003 23.953125  0.140625 23.859375  C 0.046875 23.765625  0 23.645833333333332  0 23.5  L 0 17.5  C 0 16.53125  0.3411458333333333 15.705729166666664  1.0234375 15.0234375  C 1.7057291666666667 14.34114583333333  2.53125 14  3.5 14  L 3.9375 14  L 5.578125 7.453125  C 5.817708333333334 6.473958333333332  6.359375 5.653645833333332  7.203125 4.9921875  C 8.046875 4.330729166666664  8.979166666666668 4.000000000000002  10 4.000000000000002  L 12 4.000000000000002  L 12 0.5000000000000013  C 12 0.35416666666666385  12.046875 0.23437499999999956  12.140625 0.1406249999999991  C 12.234375000000002 0.04687499999999867  12.354166666666668 0  12.5 0  L 19.5 0  C 19.645833333333336 0  19.765625 0.04687499999999867  19.859375 0.1406249999999991  C 19.953125 0.23437499999999956  20 0.35416666666666385  20 0.5000000000000013  L 20 4.000000000000002  L 22 4.000000000000002  C 23.020833333333336 4.000000000000002  23.953125 4.330729166666664  24.796875 4.9921875  C 25.640625000000004 5.653645833333332  26.18229166666667 6.473958333333332  26.421875 7.453125  L 28.0625 14  Z M 3.234375 20.765625  C 3.7239583333333335 21.255208333333332  4.3125 21.5  5 21.5  C 5.6875 21.5  6.276041666666667 21.255208333333332  6.765625 20.765625  C 7.255208333333334 20.27604166666667  7.500000000000001 19.6875  7.5 19  C 7.500000000000001 18.3125  7.255208333333334 17.723958333333332  6.765625 17.234375  C 6.276041666666667 16.744791666666664  5.6875 16.5  5 16.5  C 4.3125 16.5  3.7239583333333335 16.744791666666664  3.234375 17.234375  C 2.744791666666667 17.723958333333332  2.5 18.3125  2.5 19  C 2.5 19.6875  2.744791666666667 20.27604166666667  3.234375 20.765625  Z M 9.453125 8.421875  L 8.0625 14  L 23.9375 14  L 22.546875 8.421875  C 22.526041666666668 8.338541666666664  22.453125 8.247395833333332  22.328125 8.1484375  C 22.203125 8.049479166666664  22.09375 8  22 8  L 10 8  C 9.90625 8  9.796875 8.049479166666664  9.671875 8.1484375  C 9.546875 8.247395833333332  9.473958333333334 8.338541666666664  9.453125 8.421875  Z M 25.234375 20.765625  C 25.723958333333336 21.255208333333332  26.312500000000004 21.5  27 21.5  C 27.687500000000004 21.5  28.27604166666667 21.255208333333332  28.765625 20.765625  C 29.255208333333336 20.27604166666667  29.5 19.6875  29.5 19  C 29.5 18.3125  29.255208333333336 17.723958333333332  28.765625 17.234375  C 28.27604166666667 16.744791666666664  27.687500000000004 16.5  27 16.5  C 26.312500000000004 16.5  25.723958333333336 16.744791666666664  25.234375 17.234375  C 24.744791666666668 17.723958333333332  24.5 18.3125  24.5 19  C 24.5 19.6875  24.744791666666668 20.27604166666667  25.234375 20.765625  Z "
                    fill="white"
                    stroke="none"
                    transform="matrix(1 0 0 1 1043 131 )"
                    class="fill"
                  ></path>
                  <path
                    d="M 28.0625 14  L 28.5 14  C 29.468750000000004 14  30.294270833333336 14.34114583333333  30.9765625 15.0234375  C 31.658854166666668 15.705729166666664  32 16.53125  32 17.5  L 32 23.5  C 32 23.645833333333332  31.953125 23.765625  31.859375 23.859375  C 31.765625 23.953125  31.645833333333336 24  31.5 24  L 30 24  L 30 25  C 30.000000000000004 25.833333333333332  29.708333333333336 26.541666666666668  29.125 27.125  C 28.541666666666668 27.708333333333332  27.833333333333336 28  27 28  C 26.166666666666668 28  25.458333333333336 27.708333333333332  24.875 27.125  C 24.291666666666664 26.541666666666668  24 25.833333333333332  24 25  L 24 24  L 8 24  L 8 25  C 8 25.833333333333332  7.708333333333334 26.541666666666668  7.125 27.125  C 6.541666666666667 27.708333333333332  5.833333333333334 28  5 28  C 4.166666666666667 28  3.458333333333334 27.708333333333332  2.875 27.125  C 2.291666666666667 26.541666666666668  2 25.833333333333332  2 25  L 2 24  L 0.5 24  C 0.3541666666666667 24  0.23437500000000003 23.953125  0.140625 23.859375  C 0.046875 23.765625  0 23.645833333333332  0 23.5  L 0 17.5  C 0 16.53125  0.3411458333333333 15.705729166666664  1.0234375 15.0234375  C 1.7057291666666667 14.34114583333333  2.53125 14  3.5 14  L 3.9375 14  L 5.578125 7.453125  C 5.817708333333334 6.473958333333332  6.359375 5.653645833333332  7.203125 4.9921875  C 8.046875 4.330729166666664  8.979166666666668 4.000000000000002  10 4.000000000000002  L 12 4.000000000000002  L 12 0.5000000000000013  C 12 0.35416666666666385  12.046875 0.23437499999999956  12.140625 0.1406249999999991  C 12.234375000000002 0.04687499999999867  12.354166666666668 0  12.5 0  L 19.5 0  C 19.645833333333336 0  19.765625 0.04687499999999867  19.859375 0.1406249999999991  C 19.953125 0.23437499999999956  20 0.35416666666666385  20 0.5000000000000013  L 20 4.000000000000002  L 22 4.000000000000002  C 23.020833333333336 4.000000000000002  23.953125 4.330729166666664  24.796875 4.9921875  C 25.640625000000004 5.653645833333332  26.18229166666667 6.473958333333332  26.421875 7.453125  L 28.0625 14  Z "
                    stroke-width="0"
                    stroke-dasharray="0"
                    stroke="rgba(255, 255, 255, 0)"
                    fill="none"
                    transform="matrix(1 0 0 1 1043 131 )"
                    class="stroke"
                    mask="url(#u10559_img_cl252)"
                  ></path>
                  <path
                    d="M 3.234375 20.765625  C 3.7239583333333335 21.255208333333332  4.3125 21.5  5 21.5  C 5.6875 21.5  6.276041666666667 21.255208333333332  6.765625 20.765625  C 7.255208333333334 20.27604166666667  7.500000000000001 19.6875  7.5 19  C 7.500000000000001 18.3125  7.255208333333334 17.723958333333332  6.765625 17.234375  C 6.276041666666667 16.744791666666664  5.6875 16.5  5 16.5  C 4.3125 16.5  3.7239583333333335 16.744791666666664  3.234375 17.234375  C 2.744791666666667 17.723958333333332  2.5 18.3125  2.5 19  C 2.5 19.6875  2.744791666666667 20.27604166666667  3.234375 20.765625  Z "
                    stroke-width="0"
                    stroke-dasharray="0"
                    stroke="rgba(255, 255, 255, 0)"
                    fill="none"
                    transform="matrix(1 0 0 1 1043 131 )"
                    class="stroke"
                    mask="url(#u10559_img_cl252)"
                  ></path>
                  <path
                    d="M 9.453125 8.421875  L 8.0625 14  L 23.9375 14  L 22.546875 8.421875  C 22.526041666666668 8.338541666666664  22.453125 8.247395833333332  22.328125 8.1484375  C 22.203125 8.049479166666664  22.09375 8  22 8  L 10 8  C 9.90625 8  9.796875 8.049479166666664  9.671875 8.1484375  C 9.546875 8.247395833333332  9.473958333333334 8.338541666666664  9.453125 8.421875  Z "
                    stroke-width="0"
                    stroke-dasharray="0"
                    stroke="rgba(255, 255, 255, 0)"
                    fill="none"
                    transform="matrix(1 0 0 1 1043 131 )"
                    class="stroke"
                    mask="url(#u10559_img_cl252)"
                  ></path>
                  <path
                    d="M 25.234375 20.765625  C 25.723958333333336 21.255208333333332  26.312500000000004 21.5  27 21.5  C 27.687500000000004 21.5  28.27604166666667 21.255208333333332  28.765625 20.765625  C 29.255208333333336 20.27604166666667  29.5 19.6875  29.5 19  C 29.5 18.3125  29.255208333333336 17.723958333333332  28.765625 17.234375  C 28.27604166666667 16.744791666666664  27.687500000000004 16.5  27 16.5  C 26.312500000000004 16.5  25.723958333333336 16.744791666666664  25.234375 17.234375  C 24.744791666666668 17.723958333333332  24.5 18.3125  24.5 19  C 24.5 19.6875  24.744791666666668 20.27604166666667  25.234375 20.765625  Z "
                    stroke-width="0"
                    stroke-dasharray="0"
                    stroke="rgba(255, 255, 255, 0)"
                    fill="none"
                    transform="matrix(1 0 0 1 1043 131 )"
                    class="stroke"
                    mask="url(#u10559_img_cl252)"
                  ></path>
                </g>
              </svg>
              <div>
                车身--总库容：{{ availableCargoLocation.carBodyPercent }}
              </div>
            </div>
            <div
              v-for="(
                item, index
              ) in availableCargoLocation.availableCargoLocations"
              :key="index"
            >
              <div>{{ item.roadWay }}巷道库位/可用：</div>
              <div>{{ item.totalCount }}</div>
              <div>/</div>
              <div :class="ns.is('rightText', [1, 3].includes(item.roadWay))">
                {{ item.availableCount }}
              </div>
            </div>
          </div>
        </ItemWrap>
      </div>
      <div :class="ns.bm('right', 'bottom')">
        <ItemWrap :class="ns.e('itemWrap')" title="当日入库计划">
          <CurrentDayWarehousingPlan />
        </ItemWrap>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNameSpace } from "@/utils/useNameSpace";
import CurrentDayWarehousingPlan from "./com/CurrentDayWarehousingPlan.vue";
import ErrorCarousel from "@/components/ErrorCarousel/index.vue";
import {
  palletSortCountApi,
  errorCacheListApi,
  availableCargoLocationApi,
} from "@/api";
// 导入useRoute
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

const ns: any = useNameSpace("storage");

interface IPalletSortCount {
  containerCode: string | null;
  inCount: number | null;
  notInCount: number | null;
  palletSortCount: number | null;
  tvCode: string | undefined;
  [key: string]: any;
}
const palletSortCount = reactive<Partial<IPalletSortCount>>({
  containerCode: null,
  inCount: null,
  notInCount: null,
  palletSortCount: null,
  tvCode: "", //地址栏输入的一定是字符串
});

interface IAvailableCargoLocations {
  roadWay: number;
  availableCount: number;
  totalCount: number;
}
interface IAvailableCargoLocation {
  availableCargoLocations: IAvailableCargoLocations[];
  carBodyPercent: string;
  samplePercent: string;
}

const availableCargoLocation = reactive<Partial<IAvailableCargoLocation>>({
  availableCargoLocations: [],
  carBodyPercent: "",
  samplePercent: "",
});

const errors = ref<string[]>([]);
// 通过route获取url地址参数
const route = useRoute();

const init = () => {
  const tvCode = route.query?.tvCode || "";
  // tvCode为空时候给提示
  if (tvCode) {
    palletSortCountApi({ tvCode }).then((res: any) => {
      Object.keys(res.result).forEach((key: string) => {
        palletSortCount[key as keyof IPalletSortCount] = res.result[key];
      });
      palletSortCount.tvCode = route.query?.tvCode as string;
    });
  } else {
    ElMessage.error("路由参数错误! 例:xxxx/#/storage?tvCode=xxx");
  }

  errorCacheListApi({ tvCode }).then((res: any) => {
    errors.value = res.result?.errorList || [];
  });

  availableCargoLocationApi().then((res: any) => {
    Object.keys(res.result).forEach((key: string) => {
      availableCargoLocation[key as keyof IAvailableCargoLocation] =
        res.result[key];
    });
  });
};
init();
</script>
<style lang="scss" scoped>
.sc-storage {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  padding-top: 10px;
  box-sizing: border-box;
  font-size: var(--text-size-content);

  .sc-storage-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .sc-storage-left__top {
      height: 180px;

      .sc-storage-left__container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;

        .sc-storage-left__text--type {
          font-size: var(--text-size-title);

          span {
            color: var(--text-red-color);
          }
        }

        .sc-storage-left__text--tuopan {
          font-size: var(--text-size-title);

          span {
            color: var(--text-blue-color);
          }
        }

        .sc-storage-left__topItemBox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }

      .sc-storage-left__text--not-in {
        color: var(--text-red-color);
      }
    }

    .sc-storage-left--bottom {
      flex: 1;

      .sc-storage-errorText {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-red-color);
        font-size: 48px;
        font-weight: bold;
        color: #ff4d4d;
        text-shadow: 0 0 10px rgba(255, 77, 77, 0.7);
        animation: textBlink 2s infinite;
      }
    }
  }

  .sc-storage-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .sc-storage-right--top {
      height: 180px;

      .sc-storage-right__container {
        // display: flex;
        // flex-direction: column;
        // gap: 20px;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        justify-items: center;
        align-items: center;

        // 后代儿子div
        div {
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }

        .is-rightText {
          color: var(--text-green-color);
        }
      }
    }

    .sc-storage-right--bottom {
      flex: 1;
      max-height: 785px;
    }
  }
}

.sc-storage__itemWrap {
  padding: 20px 10px;
  box-sizing: border-box;
  overflow: hidden;
}

:deep(.el-descriptions__body) {
  background-color: rgba(0, 0, 0, 0);
  --el-text-color-primary: var(--text-white-color);
  --el-text-color-regular: var(--text-white-color);

  .el-descriptions__cell {
    font-size: var(--text-size-content) !important;
  }
}

:deep(.sc-storage-descriptions__jindu) {
  color: var(--text-red-color) !important;
}

@keyframes textBlink {
  0%,
  100% {
    transform: scale(1);
    text-shadow: 0 0 10px rgba(255, 77, 77, 0.7);
  }
  50% {
    transform: scale(1.3);
    text-shadow: 0 0 20px rgba(255, 77, 77, 0.9);
  }
}
</style>
