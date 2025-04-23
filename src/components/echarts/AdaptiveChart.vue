<template>
    <div ref="chartRef" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script lang="ts" setup>
import { ref, toRef, watch } from "vue";
import { useECharts, mergeOptions } from "@/hooks/useECharts";
import type { IOptionsData, ISeriesItem } from "@/hooks/useECharts";
import type { EChartsOption } from "echarts";
const props = withDefaults(defineProps<{
    data: IOptionsData;
    options?: EChartsOption | any;
}>(), {
    data: () => ({
        xdata: [], // 默认 x 轴数据为空数组
        series: [], // 默认系列数据为空数组
    }),
});

// 监听data。变化时候执行updateChart
watch(toRef(props, "data"), () => {
    updateChart();
}, { deep: true });


const chartRef = ref<HTMLDivElement | null>(null);
const [setOptions] = useECharts(chartRef);
// const lineChartData = ref<IOptionsData>({
//     xdata: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
//     series: [
//         {
//             name: "访问量",
//             type: "line",
//             data: [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 91],
//             color: "#a91023",
//         },
//         {
//             name: "访问量2",
//             type: "line",
//             data: [303, 300, 150, 80, 80, 70, 110, 91, 70, 110, 130, 150,],
//             color: "#2121b5",
//         },
//     ],
// });

const updateChart = () => {
    const options = {
        tooltip: {
            trigger: "axis",
            textStyle: {
                color: "#000", // 设置 tooltip 字体颜色为黑色
            },
        },
        legend: {
            show: true,
            textStyle: {
                color: "#fff", // 设置 tooltip 字体颜色为黑色
            },
        },
        grid: {
            left: "1%", // 左边距
            right: "5%", // 右边距
            top: "10%", // 上边距
            bottom: "5%", // 下边距
            containLabel: true, // 确保坐标文字显示在 grid 区域内
        },
        xAxis: {
            type: "category",
            data: props.data.xdata,
            axisLabel: {
                color: "#fff", // 设置 x 轴字体颜色为白色
            },
            axisLine: {
                lineStyle: {
                    color: "#81cff2", // 设置 x 轴线颜色为白色
                },
                symbol: ['none', 'arrow'], // 在 x 轴末端加上箭头
                symbolSize: [10, 15], // 设置箭头大小
            },
            axisTick: {
                show: false, // 移除 x 轴的刻度
            },
            splitLine: {
                show: false, // 移除 x 轴的网格线
            },
            name: "月份", // 在 x 轴右侧加上“月份”
            // nameLocation: "end", // 将“月份”放在 x 轴右侧
            nameTextStyle: {
                color: "#fff", // 设置“月份”字体颜色为白色
                padding: [8, -8, 0, 0], // 调整“月份”的位置
                align: "right", // 将“月份”标签右对齐
                verticalAlign: "top", // 将“月份”标签放在底部
            },
        },
        yAxis: {
            type: "value",
            show: true, // 确保 y 轴显示
            name: "数量", // 设置 y 轴单位
            nameLocation: "end", // 将单位放在 y 轴的左侧
            nameTextStyle: {
                color: "#fff", // 设置 y 轴单位字体颜色为白色
                padding: [0, 0, 0, -40], // 调整单位的位置
            },
            axisLabel: {
                color: "#fff", // 设置 y 轴字体颜色为白色
            },
            axisLine: {
                show: true, // 显示 y 轴线
                lineStyle: {
                    color: "#81cff2", // 设置 y 轴线颜色为白色
                },
                symbol: ['none', 'arrow'], // 在 y 轴末端加上箭头
                symbolSize: [10, 15], // 设置箭头大小
            },
            splitLine: {
                show: false, // 移除 y 轴的网格线
            },
        },
        series: props.data.series.map((item: ISeriesItem) => ({
            ...item,
        })),
    };
    console.log(123, props.options);

    mergeOptions(options, props.options || {})
    console.log(options);

    setOptions(options);
};
</script>
