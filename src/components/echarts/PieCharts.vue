<template>
    <div ref="chartRef" class="pie-chart"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, toRef } from "vue";
import { useECharts } from "@/hooks/useECharts";
import type { IPieItem } from "@/hooks/useECharts";

const props = withDefaults(defineProps<{
    data: IPieItem[];
}>(), {
    data: () => [], // 设置默认值为空数组
});

// 监听data。变化时候执行updateChart
watch(toRef(props, "data"), () => {
    updateChart();
}, { deep: true });

const chartRef = ref<HTMLDivElement | null>(null);
const [setOptions] = useECharts(chartRef);
// const pieCarBodyData = ref<IPieItem[]>([
//     { value: 1048, name: "碰撞车身" },
//     { value: 735, name: "加固车身" },
//     { value: 580, name: "白色车身" },
// ]);

const updateChart = () => {
    const options = {
        tooltip: {
            trigger: "item",
            textStyle: {
                color: "#000", // 设置 tooltip 字体颜色为白色
            },
        },
        legend: {
            show: false,
        },
        grid: {
            left: "0%", // 左边距
            right: "0%", // 右边距
            top: "0%", // 上边距
            bottom: "0%", // 下边距
            containLabel: true, // 确保坐标文字显示在 grid 区域内
        },
        color: ["#919ef4", "#df6a6a", "#b4dd43"], // 设置饼状图的颜色
        series: [
            {
                name: "饼状图",
                type: "pie",
                radius: "90%", // 增大饼图的半径
                data: props.data,
                label: {
                    formatter: "{b}\n{c}",
                    position: "inside",
                    align: "center",
                    verticalAlign: "middle",
                    fontSize: 14,
                    lineHeight: 20,
                    color: "#fff", // 设置 label 字体颜色为白色
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };
    setOptions(options);
};

</script>

<style scoped>
.pie-chart {
    width: 100%;
    height: 100%;
}
</style>