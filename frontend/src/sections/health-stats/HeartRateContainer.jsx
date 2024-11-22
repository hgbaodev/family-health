import HeartRateTable from "./HeartRateTable";
import HeartRateChart from "./HeartRateChart";
import { useState } from "react";
import { Flex } from "antd";

const HeartRateContainer = ({ selectedMemberId }) => {
  const [date, setDate] = useState("");
  const selectedStatType = "Heart Rate"   

  return (
      <>
        <Flex justify="space-between" className="w-full bg-white p-5 rounded-md" >
        <div className="flex-1" >
            <HeartRateTable
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
              onDateChange={setDate}
            />
          </div>
          <div className="flex-1 pl-2" >
            <HeartRateChart
              selectedMemberId={selectedMemberId} 
              selectedStatType={selectedStatType}
              date={date}
            /> 
          </div>
        </Flex>
      </>
  );
};

export default HeartRateContainer;