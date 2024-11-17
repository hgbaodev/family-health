import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { Card, Col } from "antd";
import {memo} from "react";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = memo(({ id, note, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };
  return (
    <Col
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      span={6}
      className="mb-6"
    >
      <Card
        className="w-full"
        title={note.title}
        actions={[
          <EditOutlined key="edit" onClick={
            (e) => {
              e.stopPropagation(); // prevent
              onEdit(note);
            }
          } 
          />,
          <DeleteOutlined key="delete" onClick={() => onDelete(note.noteID)} />,
        ]}
      >
        {note.content}
      </Card>
    </Col>
  );
});

export default SortableItem;
