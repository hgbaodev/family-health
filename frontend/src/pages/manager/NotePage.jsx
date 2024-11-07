import {  PlusSquareOutlined } from "@ant-design/icons";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button, Flex, Form, Input, Modal, Row, Space } from "antd";
import { useState } from "react";
import PageHeader from "~/components/page-header";
import SortableItem from "~/sections/notes/SortableItem";

const listNotes = [
  {
    user_id: 1,
    index: 1,
    title: "Hôm nay",
    content: "Thật yêu đời",
    created_at: "2024/10/12 12:00:00",
  },
  {
    index: 2,
    title: "Hôm nay 2",
    content: "Thật yêu đời 2",
    created_at: "2024/10/12 12:00:00",
  },
  {
    index: 3,
    title: "Hôm nay 3",
    content: "Thật yêu đời 3",
    created_at: "2024/10/12 12:00:00",
  },
  {
    index: 4,
    title: "Hôm nay 4",
    content: "Thật yêu đời 4",
    created_at: "2024/10/12 12:00:00",
  },
  {
    index: 5,
    title: "Hôm nay 5",
    content: "Thật yêu đời 5",
    created_at: "2024/10/12 12:00:00",
  },
];



const NotePage = () => {
  const [notes, setNotes] = useState(listNotes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  console.log("notes", notes);

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentNote({
      index: notes.length + 1,
      title: '',
      content: '',
      created_at: new Date().toISOString(),
    });
    setIsModalVisible(true);
  };

  const handleEdit = (note) => {
    setIsEditMode(true);
    setCurrentNote(note);
    setIsModalVisible(true);
  };

  const handleDelete = (index) => {
    setNotes(notes.filter(note => note.index !== index));
  };

  const handleOk = (values) => {
    if (isEditMode) {
      setNotes(notes.map(note => (note.index === currentNote.index ? { ...currentNote, ...values } : note)));
    } else {
      setNotes([...notes, { ...currentNote, ...values }]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setNotes((items) => {
        const oldIndex = items.findIndex(item => item.index === active.id);
        const newIndex = items.findIndex(item => item.index === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading={"Notes"}
          links={[{ title: "Dashboard", href: "/manager" }, { title: "Notes" }]}
        />
        <Space>
          <Button type="primary" icon={<PlusSquareOutlined />} onClick={handleAdd}>
            Add
          </Button>
        </Space>
      </Flex>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={notes.map(note => note.index)} strategy={verticalListSortingStrategy}>
          <Row gutter={16}>
            {notes.map((note) => (
              <SortableItem key={note.index} id={note.index} note={note} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </Row>
        </SortableContext>
      </DndContext>
      <Modal
        title={isEditMode ? "Edit Note" : "Add Note"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentNote}
          onFinish={handleOk}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Save" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};



export default NotePage;
