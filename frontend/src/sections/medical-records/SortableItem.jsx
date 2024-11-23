import { Button, Input, DatePicker, Flex, Card } from "antd";
import { 
  MedicineBoxOutlined, 
  CalendarOutlined,
  DeleteOutlined,
  DragOutlined
} from "@ant-design/icons";
import moment from "moment";
import {
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


// SortableItem component for each medication card
const SortableItem = ({ form, onRemove, onInputChange }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: form.position.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={`p-4 bg-gray-50 border border-gray-200 hover:border-blue-400 transition-all duration-300 ${
          isDragging ? 'shadow-lg' : ''
        }`}
      >
        <Flex align="center" gap={4}>
          <DragOutlined
            className="cursor-grab text-gray-400 hover:text-blue-500"
            {...attributes}
            {...listeners}
          />
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
    </div>
  );
};

export default SortableItem;