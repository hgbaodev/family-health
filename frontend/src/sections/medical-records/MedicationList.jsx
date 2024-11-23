import {
  Button,
  Input,
  DatePicker,
  Flex,
  Card,
  Typography
} from "antd";
import { 
  MedicineBoxOutlined, 
  CalendarOutlined,
  PlusOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import moment from "moment";
import { useMedicalRecordsStore } from "~/stores/medicalRecordStore";

const { Title } = Typography;

const MedicationList = () => {
  const { listMedication, addMedication, removeMedication, handleInputMedicationChange } = useMedicalRecordsStore((state) => state);

  return (
    <Card className="shadow-sm">
      <Title level={4} className="mb-6 text-center">
        <MedicineBoxOutlined className="mr-2 text-blue-500" />
        Danh sách thuốc điều trị
      </Title>
      
      <Flex vertical gap={4}>
        {listMedication.map((form) => (
            <Card
              key={form.position}
              className="bg-gray-50 border border-gray-200 hover:border-blue-400 transition-all duration-300 p-4"
            >
              <Flex align="center" gap={4}>
                <span className="font-bold">{form.position}</span>
                <Input
                  placeholder="Tên thuốc"
                  value={form.name}
                  onChange={(e) =>
                    handleInputMedicationChange(form.position, "name", e.target.value)
                  }
                  prefix={<MedicineBoxOutlined className="text-gray-400" />}
                  className="w-64"
                />
                
                <Input
                  placeholder="Liều lượng"
                  value={form.frequency}
                  onChange={(e) =>
                    handleInputMedicationChange(form.position, "frequency", e.target.value)
                  }
                  className="w-48"
                />
                
                <DatePicker
                  placeholder="Ngày bắt đầu"
                  value={form.startDate ? moment(form.startDate) : null}
                  onChange={(date) =>
                    handleInputMedicationChange(
                      form.position,
                      "startDate",
                      date ? date.format("YYYY-MM-DD") : ""
                    )
                  }
                  prefix={<CalendarOutlined className="text-gray-400" />}
                  className="w-40"
                />
                
                <DatePicker
                  placeholder="Ngày kết thúc"
                  value={form.endDate ? moment(form.endDate) : null}
                  onChange={(date) =>
                    handleInputMedicationChange(
                      form.position,
                      "endDate",
                      date ? date.format("YYYY-MM-DD") : ""
                    )
                  }
                  prefix={<CalendarOutlined className="text-gray-400" />}
                  className="w-40"
                />
                
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeMedication(form.position)}
                  className="ml-auto hover:bg-red-50"
                />
              </Flex>
            </Card>
          ))}
      </Flex>

      <Flex justify="center" className="mt-6">
        <Button 
          type="dashed"
          onClick={addMedication}
          icon={<PlusOutlined />}
          size="large"
          className="min-w-40 hover:border-blue-400 hover:text-blue-500"
        >
          Thêm thuốc mới
        </Button>
      </Flex>
    </Card>
  );
};

export default MedicationList;