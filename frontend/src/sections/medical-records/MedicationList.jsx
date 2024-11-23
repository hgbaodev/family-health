import { Button, Flex, Card, Typography } from "antd";
import { 
  MedicineBoxOutlined, 
  PlusOutlined,
} from "@ant-design/icons";
import { useMedicalRecordsStore } from "~/stores/medicalRecordStore";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from "react";
import SortableItem from "~/sections/medical-records/SortableItem";
import DraggableOverlay from "~/sections/medical-records/DraggableOverlay";

const { Title } = Typography;

const MedicationList = () => {
  const { 
    listMedication, 
    addMedication, 
    removeMedication, 
    handleInputMedicationChange,
    setListMedication,
  } = useMedicalRecordsStore((state) => state);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = listMedication.findIndex(
        item => item.position.toString() === active.id
      );
      const newIndex = listMedication.findIndex(
        item => item.position.toString() === over.id
      );

      const newPositions = arrayMove(listMedication, oldIndex, newIndex);
      setListMedication(newPositions);
      console.log("newPositions", newPositions);
    }
  };

  const activeForm = activeId 
    ? listMedication.find(item => item.position.toString() === activeId)
    : null;

  return (
    <Card className="shadow-sm">
      <Title level={4} className="mb-6 text-center">
        <MedicineBoxOutlined className="mr-2 text-blue-500" />
        Danh sách thuốc điều trị
      </Title>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={listMedication.map(item => item.position.toString())}
          strategy={verticalListSortingStrategy}
        >
          <Flex vertical gap={4}>
            {listMedication.map((form) => (
              <SortableItem
                key={form.position}
                form={form}
                onRemove={removeMedication}
                onInputChange={handleInputMedicationChange}
              />
            ))}
          </Flex>
        </SortableContext>

        <DragOverlay>
          {activeForm ? (
            <DraggableOverlay
              form={activeForm}
              onRemove={removeMedication}
              onInputChange={handleInputMedicationChange}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

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