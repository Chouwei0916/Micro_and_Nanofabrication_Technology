/**
 * charts.js — ECharts 图表初始化、配置、响应式 resize
 */

let chartInstances = {}; // 全局图表实例池

// ============================================================
// 通用配置
// ============================================================
const TOOLBOX = {
    right: 15, top: 5,
    feature: { saveAsImage: { title: '保存为图片', pixelRatio: 3 } }
};

// ============================================================
// Tab1 技术演进时间线 (雷达图已删除 — 主观评分数据)
// ============================================================
function initTimeline(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return;

    const yMax = TIMELINE_DATA.length;
    const seriesData = [];
    const markAreas = [];

    TIMELINE_DATA.forEach((t, i) => {
        const y = yMax - i - 0.5;
        // R&D阶段
        seriesData.push({ name: t.name, value: [t.rdStart, t.rdEnd, y, 0], itemStyle: { color: t.color, opacity: 0.25 }, label: { show: false } });
        // Risk 阶段
        seriesData.push({ name: t.name, value: [t.riskStart, t.hvmStart, y, 1], itemStyle: { color: t.color, opacity: 0.55 }, label: { show: false } });
        // HVM 阶段
        seriesData.push({ name: t.name, value: [t.hvmStart, t.hvmEnd, y, 2], itemStyle: { color: t.color, opacity: 0.9 }, label: { show: true, formatter: t.name.replace('\n', ' '), position: 'insideLeft', fontSize: 10, color: '#fff' } });
        // 状态标签
        seriesData.push({ name: t.name + '_label', value: [t.hvmEnd + 0.3, t.hvmEnd + 0.3, y, 3], symbol: 'none', label: { show: true, formatter: t.status, position: 'right', fontSize: 9, color: t.color, fontWeight: 'bold' } });
    });

    const option = {
        toolbox: TOOLBOX,
        tooltip: { formatter: p => p.name.replace('_label', '') },
        grid: { left: 140, right: 90, top: 20, bottom: 30 },
        xAxis: { type: 'value', min: 2010, max: 2040, axisLabel: { formatter: '{value}' }, splitLine: { lineStyle: { color: '#eee', type: 'dashed' } } },
        yAxis: {
            type: 'value', min: -0.5, max: yMax,
            axisLabel: { show: false }, axisTick: { show: false }, splitLine: { show: false },
        },
        series: [{
            type: 'custom',
            renderItem: function(params, api) {
                const categoryIndex = api.value(3);
                if (categoryIndex === 3) return null; // label only handled below
                const xStart = api.coord([api.value(0), api.value(2)])[0];
                const xEnd = api.coord([api.value(1), api.value(2)])[0];
                const y = api.coord([api.value(0), api.value(2)])[1];
                const height = 18;
                return {
                    type: 'rect',
                    shape: { x: xStart, y: y - height / 2, width: Math.max(xEnd - xStart, 2), height: height },
                    style: api.style()
                };
            },
            data: seriesData,
            encode: { x: [0, 1], y: 2 },
            itemStyle: { borderColor: '#fff', borderWidth: 0.5 }
        }]
    };
    chartInstances[domId] = echarts.init(dom);
    chartInstances[domId].setOption(option);
}

// ============================================================
// Tab2 Ion vs Ioff 散点图 (对数坐标)
// ============================================================
function initIonIoff(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return;

    const groups = ['GAA纳米片', 'CFET', 'Forksheet', '2D材料FET', 'FinFET'];
    const series = groups.map(g => ({
        name: g,
        type: 'scatter',
        data: ION_IOFF_DATA.filter(d => d.group === g).map(d => ({
            value: [d.ion, d.ioff],
            name: d.name,
            symbolSize: g === '2D材料FET' ? 16 : 12,
            itemStyle: { color: d.color, borderColor: '#fff', borderWidth: 0.5 },
            source: d.source,
        })),
        emphasis: { scale: 1.4, itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' } },
        encode: { tooltip: [0, 1] }
    }));

    const option = {
        toolbox: TOOLBOX,
        legend: { bottom: 0, textStyle: { fontSize: 11 }, selectedMode: 'multiple' },
        tooltip: {
            trigger: 'item',
            formatter: p => `<b>${p.data.name}</b><br/>Ion: ${p.value[0]} μA/μm<br/>Ioff: ${p.value[1].toExponential(2)} A/μm<br/><span style="color:#888;font-size:11px">来源: ${p.data.source}</span>`
        },
        grid: { left: 80, right: 30, top: 25, bottom: 65 },
        xAxis: {
            type: 'log', name: 'Ion (μA/μm)', nameLocation: 'center', nameGap: 35,
            min: 8, max: 3000,
            axisLabel: { formatter: '{value}' },
            splitLine: { lineStyle: { color: '#eee', type: 'dashed' } }
        },
        yAxis: {
            type: 'log', name: 'Ioff (A/μm)', nameLocation: 'center', nameGap: 50,
            min: 5e-15, max: 5e-8,
            axisLabel: { formatter: v => v.toExponential(0) },
            splitLine: { lineStyle: { color: '#eee', type: 'dashed' } }
        },
        series: series
    };
    chartInstances[domId] = echarts.init(dom);
    chartInstances[domId].setOption(option);

    // 点击联动
    chartInstances[domId].on('click', function(params) {
        if (params.data && params.data.name) {
            // 尝试展开对应的折叠面板
            const name = params.data.name;
            let targetId = '';
            if (name.includes('CFET')) targetId = 'panel-cfet';
            else if (name.includes('GAA')) targetId = 'panel-gaa';
            else if (name.includes('Fork')) targetId = 'panel-fork';
            else if (name.includes('MoS') || name.includes('2D')) targetId = 'panel-2d';

            if (targetId) {
                const panel = document.getElementById(targetId);
                if (panel) {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const details = panel.querySelector('details');
                    if (details && !details.open) details.open = true;
                    panel.style.boxShadow = '0 0 0 3px #1565C0';
                    setTimeout(() => { panel.style.boxShadow = ''; }, 2000);
                }
            }
        }
    });
}

// ============================================================
// Tab2 SS 柱状图
// ============================================================
function initSSChart(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return;

    const option = {
        toolbox: TOOLBOX,
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const idx = params[0].dataIndex;
                return `<b>${SS_DATA.labels[idx].replace(/\n/g, ' ')}</b><br/>SS: ${params[0].value} mV/dec<br/><span style="color:#888;font-size:11px">来源: ${SS_DATA.sources[idx]}</span>`;
            }
        },
        grid: { left: 50, right: 20, top: 25, bottom: 100 },
        xAxis: {
            type: 'category', data: SS_DATA.labels,
            axisLabel: { fontSize: 9, interval: 0 }
        },
        yAxis: {
            type: 'value', name: 'SS (mV/dec)', min: 50, max: 92,
            splitLine: { lineStyle: { color: '#eee', type: 'dashed' } }
        },
        series: [{
            type: 'bar', data: SS_DATA.values.map((v, i) => ({ value: v, itemStyle: { color: SS_DATA.colors[i] } })),
            barWidth: '60%',
            label: { show: true, position: 'top', fontSize: 10, fontWeight: 'bold', formatter: '{c}' },
            markLine: {
                silent: true,
                symbol: 'none',
                lineStyle: { color: '#333', type: 'dashed', width: 2 },
                label: { formatter: '理论极限 60 mV/dec', position: 'end', fontSize: 11, fontWeight: 'bold' },
                data: [{ yAxis: 60 }]
            }
        }]
    };
    chartInstances[domId] = echarts.init(dom);
    chartInstances[domId].setOption(option);
}

// ============================================================
// Tab3 工艺温度对比
// ============================================================
function initProcessTemp(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return;

    const option = {
        toolbox: TOOLBOX,
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const name = params[0].name.replace(/\n/g, ' ');
                return `<b>${name}</b><br/>最高温度: ${PROCESS_TEMP_DATA.maxTemp[params[0].dataIndex]}°C<br/>后端/键合温度: ${PROCESS_TEMP_DATA.minTemp[params[0].dataIndex]}°C`;
            }
        },
        grid: { left: 50, right: 20, top: 30, bottom: 70 },
        xAxis: {
            type: 'category', data: PROCESS_TEMP_DATA.labels,
            axisLabel: { fontSize: 10, interval: 0 }
        },
        yAxis: {
            type: 'value', name: '温度 (°C)', min: 100, max: 850,
            splitLine: { lineStyle: { color: '#eee', type: 'dashed' } }
        },
        series: [
            {
                name: '最高工艺温度', type: 'bar',
                data: PROCESS_TEMP_DATA.maxTemp.map((v, i) => ({ value: v, itemStyle: { color: PROCESS_TEMP_DATA.colors[i], opacity: 0.85 } })),
                barWidth: '45%',
                label: { show: true, position: 'top', fontSize: 10, fontWeight: 'bold', formatter: '{c}°C' },
                markLine: {
                    silent: true, symbol: 'none',
                    lineStyle: { color: '#D84315', type: 'dashed', width: 2 },
                    label: { formatter: 'Cu互连兼容上限 (~400°C)', position: 'end', fontSize: 10, fontWeight: 'bold' },
                    data: [{ yAxis: 400 }]
                }
            },
            {
                name: '后端/键合温度', type: 'bar',
                data: PROCESS_TEMP_DATA.minTemp.map((v, i) => ({ value: v, itemStyle: { color: PROCESS_TEMP_DATA.colors[i], opacity: 0.3 } })),
                barWidth: '45%',
                label: { show: true, position: 'top', fontSize: 9, formatter: '{c}°C' }
            }
        ]
    };
    chartInstances[domId] = echarts.init(dom);
    chartInstances[domId].setOption(option);
}

// ============================================================
// 竞争格局: BSPDN量产时间对比
// ============================================================
function initBSPDNChart(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return;

    const yearMap = { 'H2 2025': 2025.5, 'H2 2026': 2026.5, '2027': 2027.0 };
    const chartData = BSPDN_DATA.companies.map((c, i) => ({
        name: c,
        value: yearMap[BSPDN_DATA.production[i]] || 2027,
        node: BSPDN_DATA.node[i],
        production: BSPDN_DATA.production[i],
        features: BSPDN_DATA.keyFeatures[i],
        source: BSPDN_DATA.sources[i],
        color: BSPDN_DATA.colors[i]
    }));

    const option = {
        toolbox: TOOLBOX,
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const d = chartData[params[0].dataIndex];
                return `<b>${d.name}</b><br/>
                    对应节点: ${d.node}<br/>
                    量产时间: ${d.production}<br/>
                    <span style="font-size:11px;color:#888">${d.features}</span><br/>
                    <span style="color:#888;font-size:10px">来源: ${d.source}</span>`;
            }
        },
        grid: { left: 180, right: 120, top: 25, bottom: 40 },
        xAxis: {
            type: 'value', name: '量产年份',
            min: 2025, max: 2027.5, interval: 0.5,
            axisLabel: { formatter: function(v) { return v === 2025.5 ? 'H2 2025' : v === 2026.5 ? 'H2 2026' : v === 2027 ? '2027' : ''; }, fontSize: 10 },
            splitLine: { lineStyle: { color: '#eee', type: 'dashed' } }
        },
        yAxis: {
            type: 'category',
            data: chartData.map(d => `${d.name}\n${d.node}`),
            axisLabel: { fontSize: 11, fontWeight: 'bold' }
        },
        series: [{
            type: 'bar',
            data: chartData.map(d => ({
                value: d.value,
                itemStyle: { color: d.color, borderRadius: [0, 6, 6, 0] }
            })),
            barWidth: '50%',
            label: {
                show: true, position: 'right', fontSize: 11, fontWeight: 'bold', color: '#333',
                formatter: function(p) {
                    const idx = p.dataIndex;
                    return `${chartData[idx].production} | ${chartData[idx].node}`;
                }
            },
        }]
    };
    chartInstances[domId] = echarts.init(dom);
    chartInstances[domId].setOption(option);
}

// ============================================================
// 竞争格局: SRAM密度跨节点对比
// ============================================================
function initSRAMDensityChart(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return;

    const option = {
        toolbox: TOOLBOX,
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                let html = `<b>${params[0].name}</b><br/>`;
                params.forEach(p => { html += `${p.marker} ${p.seriesName}: ${p.value} Mb/mm²<br/>`; });
                html += `<span style="color:#888;font-size:11px">来源: ${SRAM_DENSITY_DATA.sources.join(', ')}</span>`;
                return html;
            }
        },
        legend: { bottom: 0, textStyle: { fontSize: 11 } },
        grid: { left: 50, right: 20, top: 30, bottom: 40 },
        xAxis: {
            type: 'category', data: SRAM_DENSITY_DATA.nodes,
            axisLabel: { fontSize: 11, fontWeight: 'bold' }
        },
        yAxis: {
            type: 'value', name: 'SRAM Macro Density (Mb/mm²)', min: 15, max: 45,
            splitLine: { lineStyle: { color: '#eee', type: 'dashed' } }
        },
        series: SRAM_DENSITY_DATA.series.map(s => ({
            name: s.name, type: 'bar',
            data: s.data.map(v => ({ value: v, itemStyle: { color: s.color } })),
            barWidth: '25%',
            label: { show: true, position: 'top', fontSize: 10, fontWeight: 'bold', formatter: '{c}' },
            barGap: '20%'
        }))
    };
    chartInstances[domId] = echarts.init(dom);
    chartInstances[domId].setOption(option);
}

// ============================================================
// 总览: 五方案核心指标对比 (分组柱状图)
// ============================================================
function initComparisonChart(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return;

    const option = {
        toolbox: TOOLBOX,
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                let tip = `<b>${params[0].name}</b><br/>`;
                params.forEach(p => {
                    tip += `${p.marker} ${p.seriesName}: ${p.value}<br/>`;
                });
                const scheme = COMPARISON_DATA.schemes.find(s => s.name === params[0].name);
                if (scheme) tip += `<span style="color:#888;font-size:10px">来源: ${scheme.source}</span>`;
                return tip;
            }
        },
        legend: { bottom: 0, textStyle: { fontSize: 11 } },
        grid: { left: 20, right: 80, top: 25, bottom: 40 },
        xAxis: {
            type: 'category',
            data: COMPARISON_DATA.schemes.map(s => s.name),
            axisLabel: { fontSize: 10, interval: 0 }
        },
        yAxis: [
            {
                type: 'value', name: '倍数 / 百分比 / 评分',
                splitLine: { lineStyle: { color: '#eee', type: 'dashed' } },
                axisLabel: { fontSize: 10 }
            }
        ],
        series: COMPARISON_DATA.metrics.map((metric, mi) => ({
            name: metric,
            type: 'bar',
            data: COMPARISON_DATA.schemes.map(s => ({
                value: s.values[mi],
                itemStyle: {
                    color: s.color,
                    opacity: mi === 0 ? 1.0 : (mi === 1 ? 0.6 : 0.3)
                }
            })),
            barWidth: '20%',
            barGap: '15%',
            label: {
                show: true, position: 'top', fontSize: 9, fontWeight: 'bold',
                formatter: function(p) {
                    return p.value;
                }
            },
        }))
    };
    chartInstances[domId] = echarts.init(dom);
    chartInstances[domId].setOption(option);
}

// ============================================================
// 研发计划: 18月甘特图 (3泳道)
// ============================================================
function initRndGantt(domId) {
    const dom = document.getElementById(domId);
    if (!dom) return;

    const yMax = RND_GANTT_DATA.lanes.length;
    const taskHeight = 28;
    const lanePad = 12;

    function getY(laneIdx) {
        return yMax - laneIdx;
    }

    // 生成泳道背景和标签
    const markAreas = RND_GANTT_DATA.lanes.map((lane, i) => ({
        name: lane,
        yAxis: getY(i) - 0.35,
    }));

    const taskSeriesData = [];
    const milestoneData = [];
    RND_GANTT_DATA.tasks.forEach(t => {
        const y = getY(t.lane);
        if (t.milestone) {
            milestoneData.push({
                name: t.name,
                value: [t.start, y],
                itemStyle: { color: t.color }
            });
        } else {
            // value: [start, end, y_idx, task_name]
            taskSeriesData.push({
                name: t.name,
                value: [t.start, t.end, y, t.name],
                itemStyle: { color: t.color, borderRadius: 4 }
            });
        }
    });

    const option = {
        toolbox: TOOLBOX,
        tooltip: {
            formatter: function(p) {
                if (p.seriesName === 'tasks') {
                    return `<b>${p.name}</b><br/>第${p.value[0]}~${p.value[1]}月 (持续${p.value[1] - p.value[0]}个月)`;
                }
                return `<b>${p.name}</b><br/>里程碑: 第${p.value[0]}月`;
            }
        },
        grid: { left: 140, right: 60, top: 20, bottom: 30 },
        xAxis: {
            type: 'value', name: '月份', min: 0, max: 25, interval: 3,
            axisLabel: { formatter: '第{value}月', fontSize: 10 },
            splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
            nameTextStyle: { fontSize: 11 }
        },
        yAxis: {
            type: 'value', min: 0, max: yMax, interval: 1,
            axisLabel: {
                show: true, fontSize: 10, fontWeight: 'bold', color: '#444',
                formatter: function(v) { return RND_GANTT_DATA.lanes[yMax - v] || ''; }
            },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        series: [{
            name: 'tasks',
            type: 'custom',
            renderItem: function(params, api) {
                const catIndex = api.value(2);
                const xStart = api.coord([api.value(0), catIndex])[0];
                const xEnd = api.coord([api.value(1), catIndex])[0];
                const y = api.coord([api.value(0), catIndex])[1];
                const width = Math.max(xEnd - xStart, 6);
                const height = 30;

                return {
                    type: 'rect',
                    shape: { x: xStart, y: y - height / 2, width: width, height: height },
                    style: api.style(),
                    textContent: {
                        type: 'text',
                        style: {
                            text: api.value(3) || '',
                            fill: '#fff', fontSize: 9, fontWeight: 'bold'
                        },
                        position: 'inside'
                    }
                };
            },
            encode: { x: [0, 1], y: 2 },
            data: taskSeriesData
        }, {
            name: 'milestones',
            type: 'scatter',
            symbol: 'diamond',
            symbolSize: 16,
            itemStyle: { borderColor: '#fff', borderWidth: 2, color: '#C62828' },
            label: {
                show: true, position: 'top', fontSize: 10, fontWeight: 'bold',
                distance: 12, color: '#B71C1C',
                formatter: function(p) { return p.name; }
            },
            encode: { x: 0, y: 1 },
            data: milestoneData
        }]
    };
    chartInstances[domId] = echarts.init(dom);
    chartInstances[domId].setOption(option);
}

// ============================================================
// 初始化指定Tab的图表 (懒加载)
// ============================================================
function initChartsForTab(tabId) {
    // 先释放所有旧图表，避免重复初始化导致 canvas 叠加
    Object.keys(chartInstances).forEach(id => {
        if (chartInstances[id]) {
            chartInstances[id].dispose();
            delete chartInstances[id];
        }
    });

    switch (tabId) {
        case 'overview':
            // 图1 replaced with static img (FFET集成架构示意图.png)
            break;
        case 'competitor':
            setTimeout(() => { initIonIoff('chart-ion-ioff'); }, 100);
            break;
        case 'flipfet':
            // 图5 (CFET vs FlipFET 工艺温度对比) removed — replaced by static images
            break;
        case 'landscape':
            setTimeout(() => { initBSPDNChart('chart-bspdn'); initSRAMDensityChart('chart-sram-density'); }, 100);
            break;
        case 'roadmap':
            setTimeout(() => { initRndGantt('chart-rnd-gantt'); }, 100);
            break;
    }
}

// ============================================================
// 窗口 resize 时更新所有图表
// ============================================================
window.addEventListener('resize', function() {
    Object.values(chartInstances).forEach(c => { if (c && !c.isDisposed()) c.resize(); });
});
