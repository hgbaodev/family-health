import BloodGlucoseTable from "./BloodGlucoseTable";
import BloodGlucoseChart from "./BloodGlucoseChart";
import { useState } from "react";
import { Flex } from "antd";

const BloodGlucoseContainer = ({ selectedMemberId }) => {
  const [date, setDate] = useState("");
  const selectedStatType = "Blood Glucose"   

  return (
      <>
        <Flex justify="space-between" className="w-full bg-white p-5 rounded-md" >
          <div className="flex-1" >
            <BloodGlucoseTable
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
              onDateChange={setDate}
            />
          </div>
          <div className="flex-1 pl-2" >
            <BloodGlucoseChart
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
            /> 
          </div>
        </Flex>
      </>
  );
};

export default BloodGlucoseContainer;