import ReactECharts from 'echarts-for-react';
import { useGetAllUserCount } from '../utils/queryfn/home';
import React from 'react';

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

  const { data: userCount, isLoading: userCountLoading } = useGetAllUserCount();

  const [faculty, setFaculty] = React.useState<any>(null);

  React.useEffect(() => {
    if (userCount) {
      // Extract level names and user counts from the data
      const levelNames = userCount.map((item: any) => item.level);
      const userCounts = userCount.map((item: any) => item._count.user);
      // Create the legend data
      const legendData = levelNames.map((level: any) => level);

      // Create the series data
      const seriesData = levelNames.map((level: any, index: number) => ({
        value: userCounts[index],
        name: legendData[index],
      }));

      // Create the faculty object in the desired format
      const finalFaculty = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legendData,
        },
        series: [
          {
            name: 'Number of User By Faculty',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: seriesData,
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
      setFaculty(finalFaculty);
      console.log(finalFaculty);
    }
  }, [userCount]);

  return (
    <div className="space-y-6">
      <div className="font-bold text-2xl dark:text-white">
        Number of User By Faculty
      </div>
      {faculty && <ReactECharts option={faculty} style={{ height: 400 }} />}
      {/* <div className="font-bold text-2xl dark:text-white">
        Number of New Users Per Day
      </div>
      <ReactECharts option={option} /> */}
    </div>
  );
}

export default Index;
