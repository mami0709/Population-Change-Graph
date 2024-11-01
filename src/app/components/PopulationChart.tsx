'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Population } from '@/types/resas';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PopulationChartProps {
  data: { data: Population; prefName: string }[];
  category: string;
}

export function PopulationChart({ data, category }: PopulationChartProps) {
  const [chartHeight, setChartHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateChartHeight = () => {
      setChartHeight(window.innerWidth <= 640 ? 300 : 70);
    };
    updateChartHeight();
    window.addEventListener('resize', updateChartHeight);
    return () => window.removeEventListener('resize', updateChartHeight);
  }, []);

  // MEMO: chartHeightが確定するまでレンダリングを遅延
  if (chartHeight === null) return null;

  const chartData = {
    labels: data[0]?.data.data[0].data.map((item) => item.year) || [],
    datasets: data.length
      ? data.map((populationData, index) => {
          const categoryData = populationData.data.data.find(
            (item) => item.label === category
          );
          return {
            label: populationData.prefName,
            data: categoryData?.data.map((item) => item.value) || [],
            borderColor: `hsl(${(index * 80) % 360}, 70%, 50%)`,
            backgroundColor: `hsla(${(index * 80) % 360}, 70%, 50%, 0.2)`,
            fill: false,
          };
        })
      : [
          {
            label: '',
            data: [],
            borderColor: 'rgba(0,0,0,0)',
            backgroundColor: 'rgba(0,0,0,0)',
          },
        ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: data.length ? `${category}の人口推移` : '選択してください',
      },
    },
  };

  return <Line data={chartData} options={options} height={chartHeight} />;
}
