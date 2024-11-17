import { PlusSquareOutlined } from "@ant-design/icons";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button, Flex, Row, Space, Spin } from "antd";
import { useState, useEffect } from "react";
import PageHeader from "~/components/page-header";
import SortableItem from "~/sections/notes/SortableItem";

import { ROW_PER_PAGE } from "../../config/constants";
import { useNotes } from "~/api/notes/get-notes";
import { useUpdateNote } from "~/api/notes/update-note";
import CreateNoteModal from "~/sections/notes/CreateNoteModal";
import UpdateNoteModal from "~/sections/notes/UpdateNoteModal";
import { useNotesStore } from "~/stores/notes/noteStore";

const NotePage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { data: notes, isLoading } = useNotes({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });
  const {
    openCreateModal,
    setOpenCreateModal,
    openUpdateModal,
    setOpenUpdateModal,
    openDeleteModal,
    setOpenDeleteModal,
    setNote,
  } = useNotesStore((state) => state);
  const [list, setList] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    if (notes) {
      setList(notes);
    }
  }, [notes]);
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleCreate = () => {
    setOpenCreateModal(true);
  };

  const handleCreateCancel = () => {
    setOpenCreateModal(false);
  };

  const handleUpdateCancel = () => {
    setOpenUpdateModal(false);
  };

  const handleEdit = (note) => {
    console.log(note);
    console.log("Edit")
    setNote(note);
    setOpenUpdateModal(true);
  };
  const mutation = useUpdateNote();
  const updateIndex = (value) => {
    const { noteID, userID, ...formattedValues } = value;
    mutation.mutate({
      id: noteID,
      data: formattedValues,
    });
  };
  const saveOrder = (changes) => {
    const temp = [...changes];
    const updatedList = temp.map((item, index) => {
      if (item.noteIndex !== index + 1) {
        item.noteIndex = index + 1;
        updateIndex(item);
      }
      return item;
    });
  };
  const swap = (arr, old_index, new_index) => {
    const temp = [...arr];
    [temp[old_index], temp[new_index]] = [temp[new_index], temp[old_index]];
    return temp;
  };
  // const handleDragStart = (event) => {
  //   const {active, over} = event;
  //   setIsDragging(true);
  // };
  const handleDragEnd = (event) => {
    if (isDragging) {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = list.findIndex((item) => item.noteIndex === active.id);
        const newIndex = list.findIndex((item) => item.noteIndex === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          const updatedList = swap(list, oldIndex, newIndex);
          setList(updatedList);
          saveOrder(updatedList);
        }
      }
    }
    setIsDragging(false);
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading={"Notes"}
          links={[{ title: "Dashboard", href: "/manager" }, { title: "Notes" }]}
        />
        <Space>
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={handleCreate}
          >
            Add
          </Button>
        </Space>
      </Flex>
      {isLoading ? (
        <Spin tip="Loading...." />
      ) : (
        <DndContext
        
          collisionDetection={closestCenter}
          onDragMove={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={list.map((note) => note.noteIndex)}
            strategy={verticalListSortingStrategy}
          >
            <Row gutter={16}>
              {list.map((note) => (
                <SortableItem
                  key={note.noteID}
                  id={note.noteIndex}
                  note={note}
                  onEdit={() => handleEdit(note)}
                  onDelete={null}
                />
              ))}
            </Row>
          </SortableContext>
        </DndContext>
      )}
      <CreateNoteModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateNoteModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMember={null}
      />
    </>
  );
};

export default NotePage;
