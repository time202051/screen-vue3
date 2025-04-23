<template>
  <div :class="ns.b()">
    <div :class="ns.b('left')">
      <div :class="ns.bm('left', 'top')">
        <ItemWrap :class="ns.e('itemWrap')">
          <div :class="[ns.e('title'), 'mb15', 'mt10']">任务类型: 手动出库</div>
          <el-descriptions :column="3" :size="size">
            <el-descriptions-item label="当前领料单号:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="项目编码/名称/保密等级:"
              >18100000000</el-descriptions-item
            >
            <el-descriptions-item label="SO号:">Suzhou</el-descriptions-item>
            <el-descriptions-item label="TO号:">40</el-descriptions-item>
            <el-descriptions-item label="T/TP号:">40</el-descriptions-item>
            <el-descriptions-item label="PE号:">40</el-descriptions-item>
            <el-descriptions-item label="工作台:">40</el-descriptions-item>
            <el-descriptions-item label="当前出库托盘:"
              >40</el-descriptions-item
            >
            <el-descriptions-item
              label="进度:"
              :class-name="ns.be('descriptions', 'jindu')"
              :label-class-name="ns.be('descriptions', 'jindu')"
              >40%</el-descriptions-item
            >
          </el-descriptions>
        </ItemWrap>
      </div>
      <div :class="ns.bm('left', 'center')">
        <ItemWrap :class="ns.e('itemWrap')">
          <TableCom></TableCom>
        </ItemWrap>
      </div>
      <div :class="ns.bm('left', 'bottom')">
        <div>异常信息：</div>
        <div>当前入库托盘超高/朝中！</div>
      </div>
    </div>
    <div :class="ns.b('right')">
      <div :class="ns.bm('right', 'top')">
        <ItemWrap :class="ns.e('itemWrap')" title="当日计划计划表">
          <DailyOutboundSchedule></DailyOutboundSchedule>
        </ItemWrap>
      </div>
      <div :class="ns.bm('right', 'bottom')">
        <ItemWrap :class="ns.e('itemWrap')" title="当日盘点计划表">
          <DailyInventoryPlan></DailyInventoryPlan>
        </ItemWrap>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNameSpace } from "@/utils/useNameSpace";
import { ref } from "vue";
import type { ComponentSize } from "element-plus";
import TableCom from "./com/tableCom.vue";
import DailyOutboundSchedule from "./com/DailyOutboundSchedule.vue";
import DailyInventoryPlan from "./com/DailyInventoryPlan.vue";

const ns: any = useNameSpace("picking");

const size = ref<ComponentSize>("large");
</script>
<style lang="scss" scoped>
.sc-picking {
  display: flex;
  height: 100%;
  gap: 20px;

  .sc-picking-left {
    flex: 1;
    display: flex;
    flex-direction: column;

    .sc-picking-left--top {
      margin-top: 10px;
      box-sizing: border-box;
    }

    .sc-picking-left--center {
      flex: 1;
      overflow: auto;
      max-height: 730px;
      margin-top: 10px;
      box-sizing: border-box;
    }

    .sc-picking-left--bottom {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 28px;

      // 第一个div
      div:first-child {
        color: var(--text-green-color);
      }

      // 最后一个div
      div:last-child {
        color: var(--text-red-color);
      }
    }
  }

  .sc-picking-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .sc-picking-right--top {
      max-height: 550px;
      flex: 6;
      // // height: 60%;
      // overflow: auto;
      margin-top: 10px;
      box-sizing: border-box;
    }

    .sc-picking-right--bottom {
      flex: 4;
      overflow: hidden;
      max-height: 420px;
    }
  }
}

.sc-picking__itemWrap {
  padding: 15px 0;
  box-sizing: border-box;
}

.sc-picking__title {
  font-size: var(--text-size-title);
  font-weight: 900;
  color: var(--text-white-color);
}

:deep(.el-descriptions__body) {
  background-color: rgba(0, 0, 0, 0);
  --el-text-color-primary: var(--text-white-color);
  --el-text-color-regular: var(--text-white-color);

  .el-descriptions__cell {
    font-size: var(--text-size-content) !important;
  }
}

:deep(.sc-picking-descriptions__jindu) {
  color: var(--text-red-color) !important;
}

:deep(.dv-border-box-content) {
  overflow: hidden;
}
</style>
