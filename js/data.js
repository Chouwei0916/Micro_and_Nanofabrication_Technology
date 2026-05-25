/**
 * data.js — 所有图表数据、KPI指标、对照表、文献列表
 * 修改数据只需更新此文件
 */

// ============================================================
// KPI 指标卡片
// ============================================================
const KPIS = [
    { label: '逻辑密度提升', value: 3.2, unit: 'x',   suffix: ' vs FinFET',  icon: 'density', source: '黄如,吴恒等, Dual-Sided N/P FETs in FFET & PPA Scaling of Flip FET, VLSI 2025' },
    { label: '功耗降低',     value: 58,  unit: '%',   suffix: ' vs FinFET',  icon: 'power',   source: '黄如,吴恒等, Dual-Sided N/P FETs in FFET & PPA Scaling of Flip FET, VLSI 2025' },
    { label: '集成层数',     value: 8,   unit: '层',  suffix: '三维垂直',    icon: 'stack',   source: '黄如,吴恒等, Dual-Sided N/P FETs in FFET & PPA Scaling of Flip FET, VLSI 2025' },
    { label: '工艺温度',     value: 400, unit: '°C',  suffix: '全流程低温',  icon: 'temp',    source: '黄如,吴恒等, Dual-Sided N/P FETs in FFET & PPA Scaling of Flip FET, VLSI 2025' },
];

// ============================================================
// Tab1 技术演进时间线 (原雷达图已删除 — 主观评分数据)
// ============================================================
const TIMELINE_DATA = [
    { name: 'FinFET\n(16nm-5nm)',        rdStart: 2011, rdEnd: 2012, riskStart: 2013, hvmStart: 2014, hvmEnd: 2026, color: '#90A4AE', status: '已完成' },
    { name: 'GAA 纳米片\n(3nm/2nm)',      rdStart: 2017, rdEnd: 2022, riskStart: 2022, hvmStart: 2025, hvmEnd: 2029, color: '#1565C0', status: '量产中' },
    { name: 'Forksheet\n(1nm/A10)',       rdStart: 2022, rdEnd: 2027, riskStart: 2028, hvmStart: 2030, hvmEnd: 2032, color: '#00897B', status: '研发中' },
    { name: 'CFET\n(0.7nm/A7)',           rdStart: 2018, rdEnd: 2029, riskStart: 2030, hvmStart: 2033, hvmEnd: 2037, color: '#E65100', status: '功能验证' },
    { name: 'FlipFET\n(双面三维集成)',     rdStart: 2022, rdEnd: 2028, riskStart: 2030, hvmStart: 2033, hvmEnd: 2037, color: '#C62828', status: 'R&D (中国)' },
    { name: '2D材料 FET\n(亚0.5nm)',      rdStart: 2020, rdEnd: 2030, riskStart: 2033, hvmStart: 2036, hvmEnd: 2039, color: '#7B1FA2', status: '基础研究' },
];

const TIMELINE_EVENTS = [
    { year: 2022, yIdx: 1, label: '三星3nm GAA\n全球首发', color: '#1565C0' },
    { year: 2024, yIdx: 3, label: 'imec首个\n功能CFET', color: '#E65100' },
    { year: 2025, yIdx: 1.6, label: 'TSMC N2\n纳米片量产', color: '#1565C0' },
    { year: 2025, yIdx: 4.4, label: '北大FlipFET\nVLSI 2025', color: '#C62828' },
];

// ============================================================
// Tab2 Ion vs Ioff 散点图
// ============================================================
const ION_IOFF_DATA = [
    // GAA纳米片
    { name: 'GAA NS (TSMC N2 nFET)',    ion: 1100, ioff: 3e-11,  group: 'GAA纳米片', color: '#1565C0', symbol: 'circle',    source: 'TSMC IEDM 2024' },
    { name: 'GAA NS (TSMC N2 pFET)',    ion: 850,  ioff: 5e-11,  group: 'GAA纳米片', color: '#1565C0', symbol: 'circle',    source: 'TSMC IEDM 2024' },
    { name: 'GAA NS (三星 SF3 nFET)',   ion: 950,  ioff: 8e-11,  group: 'GAA纳米片', color: '#1976D2', symbol: 'diamond',   source: 'Samsung VLSI 2022' },
    { name: 'GAA NS (三星 SF3 pFET)',   ion: 720,  ioff: 1e-10,  group: 'GAA纳米片', color: '#1976D2', symbol: 'diamond',   source: 'Samsung VLSI 2022' },
    { name: 'GAA NS (JL优化/最佳)',     ion: 1050, ioff: 1.3e-14,group: 'GAA纳米片', color: '#42A5F5', symbol: 'circle',    source: 'Physica Scripta 2025' },
    // CFET
    { name: 'CFET nFET (imec)',         ion: 1000, ioff: 5e-10,  group: 'CFET',      color: '#E65100', symbol: 'triangle',  source: 'imec VLSI 2024; IEEE JEDS 2025' },
    { name: 'CFET pFET (imec)',         ion: 700,  ioff: 8e-10,  group: 'CFET',      color: '#E65100', symbol: 'triangle',  source: 'imec VLSI 2024; IEEE JEDS 2025' },
    { name: 'CFET nFET (H形优化)',      ion: 1240, ioff: 4e-10,  group: 'CFET',      color: '#FF6D00', symbol: 'triangle',  source: 'Boukortt et al., Microelectronics Journal 2026' },
    { name: 'NC-CFET (负电容增强)',     ion: 1600, ioff: 3e-10,  group: 'CFET',      color: '#FFAB40', symbol: 'triangle',  source: 'IEEE JEDS 2025' },
    // Forksheet
    { name: 'Forksheet nFET (imec)',    ion: 1050, ioff: 4e-11,  group: 'Forksheet', color: '#00897B', symbol: 'rect',      source: 'imec VLSI 2025' },
    { name: 'Forksheet pFET (imec)',    ion: 780,  ioff: 7e-11,  group: 'Forksheet', color: '#00897B', symbol: 'rect',      source: 'imec VLSI 2025' },
    // 2D材料
    { name: '2D MoS2 FET (复旦)',       ion: 465,  ioff: 3e-13,  group: '2D材料FET', color: '#7B1FA2', symbol: 'roundRect',source: 'P. Zhou, Fudan Univ. 2024' },
    { name: '2D MoS2 FET (Purdue)',     ion: 380,  ioff: 2e-13,  group: '2D材料FET', color: '#CE93D8', symbol: 'roundRect',source: 'J. Cai, Purdue IEDM 2025' },
    { name: '2D MoS2/WSe2 CFET nFET',   ion: 33,   ioff: 3.3e-13,group: '2D材料FET', color: '#E1BEE7', symbol: 'roundRect',source: 'Liu M et al., Adv. Electron. Mater. 2023' },
    { name: '2D MoS2/WSe2 CFET pFET',   ion: 12,   ioff: 4e-11,  group: '2D材料FET', color: '#E1BEE7', symbol: 'roundRect',source: 'Liu M et al., Adv. Electron. Mater. 2023' },
    // FinFET baseline
    { name: 'FinFET 5nm (基线)',        ion: 850,  ioff: 2e-9,   group: 'FinFET',    color: '#90A4AE', symbol: 'circle',    source: 'IRDS 2023' },
    { name: 'FinFET 3nm (TSMC N3)',     ion: 950,  ioff: 1e-9,   group: 'FinFET',    color: '#78909C', symbol: 'circle',    source: 'TSMC Technology Symposium 2023' },
];

// ============================================================
// Tab2 SS 柱状图
// ============================================================
const SS_DATA = {
    labels: [
        'FinFET\n5nm(基线)', 'GAA NS\n三星SF3\nnFET', 'GAA NS\n台积电N2\nnFET',
        'GAA NS\n台积电N2\npFET', 'Forksheet\nimec\nVLSI2025', 'CFET nFET\nimec\nVLSI2024',
        'FlipFET\nPKU\nVLSI2025', '2D MoS2\n顶栅FET\n(复旦)', '2D MoS2\nCFET\nnFET', 'NC-CFET\n负电容\n(IEEE2025)'
    ],
    values: [72, 68, 60.1, 63, 66, 78.7, 73.1, 60, 80, 55],
    colors: ['#90A4AE', '#1565C0', '#1565C0', '#1565C0', '#00897B', '#E65100', '#C62828', '#7B1FA2', '#7B1FA2', '#FF6D00'],
    sources: ['IRDS 2023', 'Samsung VLSI 2022', 'TSMC IEDM 2024', 'TSMC IEDM 2024', 'imec VLSI 2025', 'imec VLSI 2024', '黄如,吴恒等, VLSI 2025', 'P. Zhou, Fudan Univ. 2024', 'Liu M et al., Adv. Electron. Mater. 2023', 'IEEE JEDS 2025'],
};

// ============================================================
// Tab3 工艺温度对比
// ============================================================
const PROCESS_TEMP_DATA = {
    labels: ['FinFET\n(基线)', 'GAA纳米片\n(TSMC N2)', 'CFET\n(单片集成)', 'FlipFET\n(双面键合)', '2D FET\n(IEDM2025)'],
    maxTemp: [650, 700, 750, 400, 500],
    minTemp: [400, 450, 550, 200, 300],
    colors: ['#1565C0', '#1565C0', '#E65100', '#C62828', '#7B1FA2'],
    sources: [
        'IRDS 2023; 业界公开工艺窗口',
        'Yeap G et al., 2nm Nanosheet Transistors, IEDM 2024',
        'Demuynck S et al., Monolithic CFET, VLSI 2024',
        '黄如,吴恒等, Dual-Sided N/P FETs in FFET & PPA Scaling of Flip FET, VLSI 2025',
        'Song YS et al., Comparative Thermal Evaluation of 2D vs Si Nanosheet, IEDM 2025',
    ],
};

// ============================================================
// Tab3 FlipFET vs CFET 对照表
// ============================================================
const FLIP_CFET_TABLE = [
    ['技术路线',     '单片垂直n/p堆叠',                                '双面器件集成（flip + backside process）'],
    ['核心思想',     '单侧3D scaling',                                '双面3D CMOS'],
    ['器件扩展',     '单侧n/p stack',                                 '双面 + 多层stack scaling'],
    ['密度潜力',     '~2×（相对FinFET）',                               'projected >2×，具备更高scaling potential'],
    ['功耗优化',     'interconnect改善有限',                            '双面routing与ePR带来更优系统级PPA潜力'],
    ['routing能力',  '单面',                                          '双面routing'],
    ['split-gate支持', '较复杂',                                      '天然支持'],
    ['热预算',       '单片高温流程复杂',                                 '前后侧工艺解耦，有利于thermal budget控制'],
    ['overlay难度',  '高AR垂直patterning',                             'backside overlay correction'],
    ['新增模块',     '多个FEOL新模块',                                 'bonding / thinning / backside lithography'],
    ['工艺成熟度',   'imec/TSMC/Intel推进',                            '北大提出，处于早期验证阶段'],
    ['产业生态',     '较成熟',                                         'EDA/PDK/标准单元仍待建立'],
];

// ============================================================
// 总览: 五方案核心指标对比 (分组柱状图)
// ============================================================
const COMPARISON_DATA = {
    metrics: ['逻辑密度提升 (x)', '功耗降低 (%)', '工艺成熟度 (1-5)'],
    schemes: [
        {
            name: 'GAA纳米片',
            values: [1.8, 30, 5],
            color: '#1565C0',
            source: 'TSMC IEDM 2024; Samsung VLSI 2022'
        },
        {
            name: 'Forksheet',
            values: [1.3, 20, 2],
            color: '#00897B',
            source: 'imec VLSI 2025 [14]'
        },
        {
            name: 'CFET',
            values: [2.0, 5, 1],
            color: '#E65100',
            source: 'imec VLSI 2024 [7]'
        },
        {
            name: '2D材料 FET',
            values: [2.5, 45, 1],
            color: '#7B1FA2',
            source: 'IEDM 2025综述; 理论估算值'
        },
        {
            name: 'FlipFET',
            values: [3.2, 58, 2],
            color: '#C62828',
            source: '黄如,吴恒等, Dual-Sided N/P FETs in FFET, VLSI 2025'
        },
    ]
};

// ============================================================
// 研发计划: 甘特图数据 (18个月时间轴, 3泳道)
// ============================================================
const RND_GANTT_DATA = {
    // 泳道 (y轴) — 对应报告三个维度
    lanes: ['工艺突破\n(3.1 重点工作)', '架构协同\n(3.2 难点应对)', '设计生态\n(3.3 远期设想)'],
    // 任务: { name, laneIndex, startMonth, endMonth, color, isMilestone }
    tasks: [
        { name: '背面套刻校正技术攻关',         lane: 0, start: 0,  end: 6,  color: '#1565C0' },
        { name: '全自对准F3ET栅极工艺',          lane: 0, start: 3,  end: 12, color: '#1976D2' },
        { name: '多层Nanosheet外延生长',         lane: 0, start: 6,  end: 18, color: '#0D47A1' },
        { name: 'FS/BS栅极对准验证',             lane: 0, start: 12, end: 18, color: '#42A5F5' },
        { name: '应力释放与热预算解耦',          lane: 1, start: 0,  end: 8,  color: '#EF6C00' },
        { name: '背面互连与高深宽比通孔制造',    lane: 1, start: 4,  end: 14, color: '#E65100' },
        { name: '三维散热建模与热安全评估',      lane: 1, start: 8,  end: 18, color: '#FB8C00' },
        { name: '二维沟道材料筛选与验证',        lane: 2, start: 6,  end: 18, color: '#7B1FA2' },
        { name: '功函数金属WFM工程调优',          lane: 2, start: 3,  end: 15, color: '#9C27B0' },
        { name: '热电协同DTCO与散热衬底集成',    lane: 2, start: 12, end: 24, color: '#4A148C' },
    ]
};

// ============================================================
// 文献列表
// ============================================================
const REFERENCES = [
    // 综述
    { cat: '综述', id: '[1]', text: 'IEEE IRDS. International Roadmap for Devices and Systems 2024 Edition: More Moore.', year: 2025, doi: 'https://irds.ieee.org/editions/' },
    { cat: '综述', id: '[2]', text: '赵正平. FinFET/GAAFET/CFET纳电子学的研究进展. 电子与封装, 2024, 24(8).', year: 2024, doi: 'https://ep.org.cn/CN/Y2024/V24/I8/80401' },
    { cat: '综述', id: '[3]', text: 'IEEE Access. Comprehensive Analysis on Complementary FET: From Device to Circuit.', year: 2025, doi: 'https://doi.org/10.1109/ACCESS.2025.3568134' },

    // GAA纳米片
    { cat: 'GAA', id: '[4]', text: 'Yeap G, et al. 2nm Platform Technology Featuring Energy-Efficient Nanosheet Transistors. IEEE IEDM, 2024.', year: 2024, doi: 'https://doi.org/10.1109/IEDM50854.2024.10873475' },
    { cat: 'GAA', id: '[5]', text: 'Samsung Foundry. GAA MBCFET PPA Optimization through DTCO. Samsung Semiconductor Global, 2023.', year: 2023, doi: 'https://semiconductor.samsung.com/news-events/tech-blog/gaa-dtco-for-ppa/' },
    { cat: 'GAA', id: '[6]', text: 'Rani J, et al. Analysis of Multi-Bridge-Channel FET for CMOS Logic Applications. Physica Scripta, 2025, 100: 035914.', year: 2025, doi: '' },

    // CFET
    { cat: 'CFET', id: '[7]', text: 'Demuynck S, et al. Monolithic CFET Demonstrated using Middle Dielectric Isolation and Stacked Contacts. IEEE VLSI Symposium, 2024.', year: 2024, doi: 'https://doi.org/10.1109/VLSITechnologyandCir46783.2024.10631349' },
    { cat: 'CFET', id: '[8]', text: 'imec. Monolithic CFET Flow Improvements Integrating Cover Spacer and Dual-WF RMG. IEEE VLSI Symposium, 2025.', year: 2025, doi: '' },
    { cat: 'CFET', id: '[9]', text: 'Shahin S, et al. CFET Beyond 3 nm: SRAM Reliability Under Design-Time and Run-Time Variability. IEEE JXCDC, 2025, 11: 51-59.', year: 2025, doi: 'https://doi.org/10.1109/JXCDC.2025.3568622' },
    { cat: 'CFET', id: '[10]', text: 'Boukortt A, Stroobandt D. Modeling and Optimization of CFET Structures for Sub-3 nm CMOS Scaling. Microelectronics Journal, 2026.', year: 2026, doi: '' },
    { cat: 'CFET', id: '[11]', text: 'Wang Y, et al. A Novel H-Shaped FET for Enhanced CFET Performance. Solid-State Electronics, 2026.', year: 2026, doi: '' },

    // FlipFET
    { cat: 'FlipFET', id: '[12]', text: '黄如, 吴恒, 等. First Experimental Demonstration of Dual-Sided N/P FETs in FFET on 300mm Wafers. IEEE VLSI Symposium, 2025.', year: 2025, doi: 'https://doi.org/10.23919/VLSITechnologyandCir65189.2025.11075188' },
    { cat: 'FlipFET', id: '[13]', text: '黄如, 吴恒, 等. PPA Scaling of Flip FET Technology Down to A2 Node. IEEE VLSI Symposium, 2025.', year: 2025, doi: 'https://doi.org/10.23919/VLSITechnologyandCir65189.2025.11074822' },

    // Forksheet
    { cat: 'Forksheet', id: '[14]', text: 'imec. Outer Wall Forksheet: Bridging Nanosheet and CFET Architectures. imec Articles, VLSI 2025.', year: 2025, doi: 'https://www.imec-int.com/en/articles/outer-wall-forksheet-bridge-nanosheet-and-cfet-device-architectures-logic-technology' },

    // 2D材料
    { cat: '2D材料', id: '[15]', text: 'Zhou P, et al. Wafer-Scale Monolayer MoS2 Microprocessor with ~6000 Transistors. Fudan University, 2024.', year: 2024, doi: '' },
    { cat: '2D材料', id: '[16]', text: 'Cai J, et al. Dual-Gate Monolayer MoS2 FETs with 0.3nm Contact Extensions. IEEE IEDM, 2025.', year: 2025, doi: '' },
    { cat: '2D材料', id: '[17]', text: 'Liu M, et al. Large-Scale Ultrathin Channel NS-Stacked CFET Based on CVD 1L MoS2/WSe2. Adv. Electron. Mater., 2023.', year: 2023, doi: '' },
    { cat: '2D材料', id: '[18]', text: 'Song YS, et al. Comparative Thermal Evaluation of 2D Semiconductor vs. Si Nanosheet Transistors. IEEE IEDM, 2025.', year: 2025, doi: '' },

    // 产业参考
    { cat: '产业', id: '[19]', text: 'Stanford 2D Trends Database. https://2d.stanford.edu/2D_Trends.html', year: 2025, doi: 'https://2d.stanford.edu/2D_Trends.html' },
];

const REF_CATEGORIES = ['全部', '综述', 'GAA', 'CFET', 'FlipFET', 'Forksheet', '2D材料', '产业'];

// ============================================================
// 竞争格局: 公司战略画像
// ============================================================
const COMPANY_PROFILES = [
    {
        name: 'TSMC (台积电)',
        node: '3nm FinFET (N3)',
        target2nm: 'N2 GAA 2025H2; A16 SPR 2026H2',
        strategy: '渐进式GAA部署+3DFabric系统集成。N2率先量产GAA纳米片(2025H2)，A16叠加Super Power Rail BSPDN(2026H2)，SoIC/CoWoS/InFO三位一体封装生态锁定AI/HPC客户。',
        risk: 'High-NA EUV滞后(坚持0.33NA至A14)；地缘政治风险(台湾海峡)；CoWoS产能缺口~15%',
        color: '#1565C0'
    },
    {
        name: 'Samsung (三星)',
        node: 'SF3 GAA MBCFET',
        target2nm: 'SF2 2025-2026; SF2Z BSPDN 2027',
        strategy: '激进GAA先发+存储-逻辑协同。全球首款GAA量产(SF3, 2022)但良率挣扎(20-60%, Samsung Foundry Forum 2023; ChosunBiz 2023; TrendForce 2024综合报道)。SF2集成BSPDN，特斯拉AI6 165亿美元Turnkey订单是关键变量。',
        risk: 'SF3良率导致客户流失(Qualcomm/NVIDIA转单TSMC)；代工业务2023-2024亏损超$3B；High-NA EUV进度落后Intel',
        color: '#00897B'
    },
    {
        name: 'Intel (英特尔)',
        node: 'Intel 4/3 (7nm EUV)',
        target2nm: '18A RibbonFET + PowerVia 2025H2',
        strategy: '唯一同时部署GAA+BSPDN的厂商，PowerVia领先TSMC一整年。High-NA EUV全球独家(2台EXE:5000已安装)，14A节点(1.4nm)目标2027试产。IDM 2.0代工模式开放外部客户。',
        risk: '历史执行纪录不佳(10nm/7nm多次跳票)；代工客户获取尚未规模化；财务压力(IDM重资产模式)',
        color: '#E65100'
    },
    {
        name: 'Rapidus (日本)',
        node: '— (新进入者)',
        target2nm: '2nm GAA NS 2027 (IBM技术转移)',
        strategy: '日本政府2.4万亿日元产业政策驱动+IBM 2nm技术授权。Canon(首客)、Tenstorrent(AI芯片)、Fujitsu(AI NPU)。单晶圆加工模式:小批量、快周转、低最小订单量——"先进逻辑快捷通道"。',
        risk: '零先进节点量产履历；2027目标比TSMC/Samsung晚2-3年；资金规模比三大厂商低两个数量级；人才短缺',
        color: '#7B1FA2'
    }
];

// ============================================================
// 竞争格局: BSPDN就绪度对比
// ============================================================
const BSPDN_DATA = {
    companies: ['Intel (PowerVia)', 'TSMC (Super Power Rail)', 'Samsung (BSPDN)'],
    node: ['Intel 18A', 'TSMC A16', 'Samsung SF2Z'],
    production: ['H2 2025', 'H2 2026', '2027'],
    keyFeatures: [
        '纳米TSV预埋FEOL, 全功率背面供电, IR Drop -30%, 标准单元利用率>90%',
        '背面金属直连源漏, 频率+10%, 功耗-15~20%(@同频), 密度+7~10%',
        'BPR+BSPDN集成, 面积-14.8%, 线长-9.2%, 工艺细节未公开'
    ],
    sources: [
        'Intel IEDM 2024; Intel Technology Roadmap 2025',
        'TSMC Technology Symposium 2024; TSMC IEDM 2024',
        'Samsung Foundry Forum 2023; Samsung SFF 2024'
    ],
    colors: ['#E65100', '#1565C0', '#00897B']
};

// ============================================================
// 竞争格局: High-NA EUV采用时间线
// ============================================================
const HIGH_NA_EUV_TIMELINE = [
    { company: 'Intel', color: '#E65100', yIdx: 0,
      rndStart: 2018, rndEnd: 2023, riskStart: 2023, prodStart: 2025, prodEnd: 2028,
      events: [{ year: 2023.9, label: '首台\nEXE:5000' }, { year: 2024.8, label: '第2台\n安装' }, { year: 2025.5, label: 'EXE:5200B\n验收' }],
      status: '量产开发中 (18A/14A)' },
    { company: 'Samsung', color: '#00897B', yIdx: 1,
      rndStart: 2022, rndEnd: 2025, riskStart: 2025, prodStart: 2027, prodEnd: 2030,
      events: [{ year: 2025.2, label: 'EXE:5000\n华城安装' }, { year: 2025.7, label: 'EXE:5200B\n到货' }],
      status: '2nm开发中 (2026试产)' },
    { company: 'TSMC (观望)', color: '#1565C0', yIdx: 2,
      rndStart: 2024, rndEnd: 2026, riskStart: 2028, prodStart: 2030, prodEnd: 2033,
      events: [{ year: 2024.9, label: '评估机\n到货' }],
      status: 'A14前不采用 (2030+)' },
];

// ============================================================
// 竞争格局: SRAM密度跨节点对比
// ============================================================
const SRAM_DENSITY_DATA = {
    companies: ['TSMC', 'Intel', 'Samsung'],
    nodes: ['N5 (5nm)', 'N3 (3nm)', 'N2 (2nm)'],
    // Mb/mm2 per company per node
    series: [
        { name: 'TSMC', data: [25, 33, 38], color: '#1565C0' },
        { name: 'Intel', data: [22, 28, 31.8], color: '#E65100' },
        { name: 'Samsung', data: [20, 26, 30], color: '#00897B' },
    ],
    sources: ['TechInsights IEDM 2025', 'TSMC IEDM 2024', 'Samsung Foundry Forum 2023; Intel IEDM 2024 (基于公开数据估算)']
};

// ============================================================
// 竞争格局: 3D封装生态系统
// ============================================================
const PACKAGING_DATA = [
    { company: 'TSMC', platform: '3DFabric', tech: 'CoWoS-S/R/L + SoIC + InFO',
      interposer: '5.5x reticle (L)', density: '混合键合 9→5μm',
      customers: 'NVIDIA, AMD, Broadcom, Google, Apple',
      status: 'CoWoS-L旗舰, 月产能7.5-8万片, 份额>90%' },
    { company: 'Intel', platform: 'EMIB + Foveros', tech: 'EMIB/EMIB-T + Foveros Direct',
      interposer: '~12x reticle (EMIB-T概念)', density: '混合键合 36→亚μm',
      customers: 'AWS, Google, MediaTek, 自家CPU',
      status: 'EMIB-T 2026; Clearwater Forest 12桥17tile已演示' },
    { company: 'Samsung', platform: 'SAINT + I-Cube', tech: 'I-CubeS/E/H + X-Cube 3D',
      interposer: '3x reticle (I-CubeS)', density: '铜-铜键合 4μm',
      customers: 'Tesla (AI6, $16.5B), 自家Exynos',
      status: '特斯拉Turnkey大单是关键变量' },
];
