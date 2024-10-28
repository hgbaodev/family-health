import BloodPressureTable from "./BloodPressureTable";
import BloodPressureChart from "./BloodPressureChart";
import '../../assets/css/health-stats.css'
import { useState } from "react";

const BloodPressureContainer = ({ selectedMemberId }) => {
  const [date, setDate] = useState("");
  const selectedStatType = "Blood Pressure"   

  return (
      <>
        <div className="flex-container" >
          <div className="table-container" >
            <BloodPressureTable 
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
              onDateChange={setDate}
            />
          </div>
          <div className="chart-container" >
            <BloodPressureChart 
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
            /> 
          </div>
        </div>
      </>
  );
};

export default BloodPressureContainer;