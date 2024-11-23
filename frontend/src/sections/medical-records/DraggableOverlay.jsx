import { Button, Card, DatePicker, Flex, Input } from "antd";
import { CalendarOutlined, DeleteOutlined, DragOutlined, MedicineBoxOutlined } from "@ant-design/icons"
import moment from "moment";

const DraggableOverlay = ({ form, onRemove, onInputChange }) => {
  return (
    <Card
      className="p-4 bg-white border-2 border-blue-400 shadow-xl rounded-lg transform scale-105"
    >
      <Flex align="center" gap={4}>
        <DragOutlined className="text-blue-500" />
        <span className="font-bold">{form.position}</span>
        
        <Input
          placeholder="Tên thuốc"
          value={form.name}
          onChange={(e) => onInputChange(form.position, "name", e.target.value)}
          prefix={<MedicineBoxOutlined className="text-gray-400" />}
          className="w-64"
        />
        
        <Input
          placeholder="Liều lượng"
          value={form.frequency}
          onChange={(e) => onInputChange(form.position, "frequency", e.target.value)}
          className="w-48"
        />
        
        <DatePicker
          placeholder="Ngày bắt đầu"
          value={form.startDate ? moment(form.startDate) : null}
          onChange={(date) =>
            onInputChange(
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
            onInputChange(
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
          onClick={() => onRemove(form.position)}
          className="ml-auto hover:bg-red-50"
        />
      </Flex>
    </Card>
  );
};

export default DraggableOverlay;