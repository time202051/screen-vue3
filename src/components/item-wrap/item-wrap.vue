<script setup lang="ts">
import BorderBox13 from "@/components/datav/border-box-13";
import { ref, onMounted } from 'vue';
import { useNameSpace } from '@/utils/useNameSpace'

const props = withDefaults(
  defineProps<{
    // 标题
    title?: number | string;
  }>(),
  {
    title: "",
  }
);
const ns: any = useNameSpace('itemWrap')

// 随机动画类名
const animationClass = ref('');

// 动画列表
const animations = [
  'fadeIn', 'slideInLeft', 'slideInRight', 'zoomIn', 'bounceIn'
];

// 随机选择一个动画
onMounted(() => {
  const randomIndex = Math.floor(Math.random() * animations.length);
  animationClass.value = animations[randomIndex];
});
</script>

<template>
  <BorderBox13 :class="[animationClass, ns.is('hasPaddingTop', !!title)]">
    <div class="item_title" v-if="title !== ''">
      <div class="zuo"></div>
      <span class="title-inner"> &nbsp;&nbsp;{{ title }}&nbsp;&nbsp; </span>
      <div class="you"></div>
    </div>
    <div :class="title !== '' ? 'item_title_content' : 'item_title_content_def'">
      <slot></slot>
    </div>
  </BorderBox13>
</template>

<style scoped lang="scss">
$item-title-height: 38px;
$item_title_content-height: calc(100% - 44px);

.item_title {
  height: $item-title-height;
  line-height: $item-title-height;
  width: 100%;
  color: #31abe3;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .zuo,
  .you {
    width: 58px;
    height: 14px;
    background-image: url("@/assets/img/titles/zuo.png");
  }

  .you {
    transform: rotate(180deg);
  }

  .title-inner {
    font-weight: 900;
    letter-spacing: 2px;
    background: linear-gradient(92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.is-hasPaddingTop {
  padding-top: 5px !important;
}

:deep(.dv-border-box-content) {
  box-sizing: border-box;
  padding: 6px 16px 0px;
}

.item_title_content {
  height: $item_title_content-height;
}

.item_title_content_def {
  width: 100%;
  height: 100%;
  padding-top: 0 !important;
}

/* 动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounceIn {

  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

/* 应用动画 */
.fadeIn {
  animation: fadeIn 1s ease-in-out;
}

.slideInLeft {
  animation: slideInLeft 1s ease-in-out;
}

.slideInRight {
  animation: slideInRight 1s ease-in-out;
}

.zoomIn {
  animation: zoomIn 1s ease-in-out;
}

.bounceIn {
  animation: bounceIn 1s ease-in-out;
}
</style>