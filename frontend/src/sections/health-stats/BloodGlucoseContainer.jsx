import BloodGlucoseTable from "./BloodGlucoseTable";
import BloodGlucoseChart from "./BloodGlucoseChart";
import '../../assets/css/health-stats.css'
import { useState } from "react";

const BloodGlucoseContainer = ({ selectedMemberId }) => {
  const [date, setDate] = useState("");
  const selectedStatType = "Blood Glucose"   

  return (
      <>
        <div className="flex-container" >
          <div className="table-container" >
            <BloodGlucoseTable
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
              onDateChange={setDate}
            />
          </div>
          <div className="chart-container" >
            <BloodGlucoseChart
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
            /> 
          </div>
        </div>
      </>
  );
};

export default BloodGlucoseContainer;