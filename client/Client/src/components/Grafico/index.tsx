import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ContainerGrafic, Text } from './styles';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';

interface ProgressChartProps {
  data: ChartData<'doughnut'>;
  options: ChartOptions<'doughnut'>;
  progressPercentage: number;
  completedTasks: number;
  totalTaks: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, options, progressPercentage, completedTasks, totalTaks }) => {
  const [dynamicData, setDynamicData] = useState(data);
  const [dynamicOptions, setDynamicOptions] = useState(options);


  useEffect(() => {
    setDynamicData(data);
  }, [data]);


  const customOptions = {
    ...dynamicOptions,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'doughnut'>) { // Tipando tooltipItem
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            const percentage = ((value as number) / totalTaks) * 100;
            return `${label}: ${value} (${percentage.toFixed(2)}%)`;
          },
        },
      },
    },
  };

  return (
    <ContainerGrafic>
      <div style={{ width: '100px', margin: '30px auto', position: 'relative'}}>
        <Doughnut data={dynamicData} options={customOptions} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '5px',
          color: '#FF6384',
        }}>
          {progressPercentage}%
        </div>
      </div>
      <Text>
        <h3>Seu progresso</h3>
        <h4 style={{marginTop: '-10px'}}>{completedTasks}/{totalTaks} tasks feitas</h4>
      </Text>
    </ContainerGrafic>
  );
};

export default ProgressChart;
