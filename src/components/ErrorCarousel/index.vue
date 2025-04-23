<template>
  <div :class="ns.b()">
    <template v-if="visibleErrors.length">
      <div
        v-for="(error, index) in visibleErrors"
        :key="index"
        :class="[ns.e('item'), { [ns.em('item', 'center')]: index === 1 }]"
      >
        <span v-if="index === 1">⚠️</span>{{ error }}
      </div>
    </template>
    <div v-else :class="ns.e('empty')">
      <slot name="empty">暂无数据</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useNameSpace } from "@/utils/useNameSpace";
const ns = useNameSpace("error-carousel");

//类似轮播图的报错组件，接收的字符串数组集合，每隔2秒轮播一次，最多显示3条，超过3条的显示最后一条
const props = withDefaults(
  defineProps<{
    errors: string[];
  }>(),
  {
    errors: () => [],
  }
);

const currentIndex = ref(0);

const visibleErrors = computed(() => {
  const errors = props.errors;
  if (errors.length === 0) {
    return [];
  }
  if (errors.length === 1) {
    return ["", errors[0], ""]; //1条的时候只显示1条
  }
  if (errors.length === 2) {
    return [
      errors[currentIndex.value % 2],
      errors[(currentIndex.value + 1) % 2],
      errors[(currentIndex.value + 2) % 2],
    ];
  }
  return [
    errors[currentIndex.value % errors.length],
    errors[(currentIndex.value + 1) % errors.length],
    errors[(currentIndex.value + 2) % errors.length],
  ];
});

let interval: any;

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.errors.length;
  }, 2000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style lang="scss" scoped>
.sc-error-carousel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: center;
  align-items: center;

  .sc-error-carousel__item {
    font-size: 16px;
    color: rgba(255, 21, 21, 0.7); // 第一条和第三条的颜色，浅灰色
    transition: all 0.3s ease;
    font-size: 26px;
    position: relative;

    &--center {
      font-size: 36px;
      font-weight: bold;
      color: var(--text-red-color); // 中间信息的颜色，红色
      animation: textBlink 2s infinite;
    }

    &:first-child {
      mask: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 60%);
    }

    &:last-child {
      mask: linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 1) 60%);
    }
  }
}

.sc-error-carousel__empty {
  color: var(--text-empty-color);
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
