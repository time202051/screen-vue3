<script setup lang="ts">
import { leftBottom } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { onMounted, reactive } from "vue";
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
  <div class="daily-header-box">剩余订单数: 5</div>

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
      <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in state.list" :key="i">
          <el-descriptions
            :column="4"
            :style="{ width: '100%', paddingTop: '10px' }"
          >
            <el-descriptions-item label="类型:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="订单号:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="项目名称:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="项目状态:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="SKU:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="总数量:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="PE:">kooriookami</el-descriptions-item>
            <el-descriptions-item label="箱卡号:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="SO号:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="TO号:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="T/TP号:"
              >kooriookami</el-descriptions-item
            >
            <el-descriptions-item label="状态:"
              >kooriookami</el-descriptions-item
            >
          </el-descriptions>
        </li>
      </ul>
    </SeamlessScroll>
    <div v-else class="empty-message">暂无数据</div>
  </div>
</template>

<style scoped lang="scss">
.left_boottom_wrap {
  overflow: hidden;
  width: 100%;
  height: calc(100% - 5px);
}

.doudong {
  overflow: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;

  .left_boottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin: 15px 0;
    border: 1px solid #f0f0f0;
    border-radius: 12px;

    .orderNum {
      margin: 0 16px 0 -20px;
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #fff;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: calc(100% - 80px);
      // width: 380px;
      flex-shrink: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -10px;
        left: -2%;
        background-size: cover;
      }

      .addresswrap {
        width: 100%;
        display: flex;
        margin-top: 8px;
      }
    }

    .wangguan {
      color: #1890ff;
      font-weight: 900;
      font-size: 15px;
      width: 80px;
      flex-shrink: 0;
    }

    .time {
      font-size: 12px;
      // color: rgba(211, 210, 210,.8);
      color: #fff;
    }

    .address {
      font-size: 12px;
      cursor: pointer;
      // @include text-overflow(1);
    }

    .types {
      width: 30px;
      flex-shrink: 0;
    }

    .typeRed {
      color: #fc1a1a;
    }

    .typeGreen {
      color: #29fc29;
    }
  }
}

.item-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--text-size-content);
}

.empty-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: var(--text-empty-color);
}

.daily-header-box {
  color: var(--text-green-color);
  position: absolute;
  top: 11px;
  right: 20px;
  font-size: 14px;
}
</style>
