import HeartRateTable from "./HeartRateTable";
import HeartRateChart from "./HeartRateChart";
import '../../assets/css/health-stats.css'
import { useState } from "react";

const HeartRateContainer = ({ selectedMemberId }) => {
  const [date, setDate] = useState("");
  const selectedStatType = "Heart Rate"   

  return (
      <>
        <div className="flex-container" >
          <div className="table-container" >
            <HeartRateTable
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
              onDateChange={setDate}
            />
          </div>
          <div className="chart-container" >
            <HeartRateChart
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
            /> 
          </div>
        </div>
      </>
  );
};

export default HeartRateContainer;