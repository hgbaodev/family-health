import BloodPressureTable from "./BloodPressureTable";
import BloodPressureChart from "./BloodPressureChart";
import { useState } from "react";
import { Flex } from "antd";

const BloodPressureContainer = ({ selectedMemberId }) => {
  const [date, setDate] = useState("");
  const selectedStatType = "Blood Pressure"   

  return (
      <>
        <Flex justify="space-between" className="w-full bg-white p-5 rounded-md" >
        <div className="flex-1" >
            <BloodPressureTable 
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
              onDateChange={setDate}
            />
          </div>
          <div className="flex-1 pl-2" >
            <BloodPressureChart 
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
            /> 
          </div>
        </Flex>
      </>
  );
};

export default BloodPressureContainer;