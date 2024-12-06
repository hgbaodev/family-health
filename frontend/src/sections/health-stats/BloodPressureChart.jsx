import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useToDisplayChart } from '~/api/health-stats/get-to-display-chart';


const BloodPressureChart = ({ selectedMemberId, selectedStatType, date }) => { 

  const { data: dataChart} = useToDisplayChart({ selectedMemberId, selectedStatType, date });

  return (
    <div>
      <h2>Máy theo dõi huyết áp</h2>
      {/* ResponsiveContainer đảm bảo biểu đồ có thể điều chỉnh kích thước */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={dataChart}
          margin={{
            top: 20, right: 50, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).toLocaleString('en-GB', {
              day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
            })}
          />
          <YAxis yAxisId="left" label={{ value: 'Huyết áp (mmHg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="statValue" stroke="#8884d8" strokeWidth={2} name={selectedStatType} />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default BloodPressureChart;
