import ReactECharts from 'echarts-for-react';

function Index() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const faculty = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: [
        'Software Engineering',
        'Class 12',
        'SLC',
        'Bachelor in Business Administration',
        'Class 9',
      ],
    },
    series: [
      {
        name: 'Number of User By Faculty',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: 'Software Engineering' },
          { value: 310, name: 'Class 12' },
          { value: 234, name: 'SLC' },
          { value: 135, name: 'Bachelor in Business Administration' },
          { value: 1548, name: 'Class 9' },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="font-bold text-2xl dark:text-white">
        Number of New Users Per Day
      </div>
      <ReactECharts option={option} />
      <div className="font-bold text-2xl dark:text-white">
        Number of Active Users
      </div>
      <ReactECharts option={options} />
      <div className="font-bold text-2xl dark:text-white">
        Number of User By Faculty
      </div>
      <ReactECharts option={faculty} style={{ height: 400 }} />
    </div>
  );
}

export default Index;
