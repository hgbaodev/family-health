import { Button, Form, Input, Modal } from "antd";
import { useUpdateNote } from "~/api/notes/update-note";
import { useNotes } from "~/api/notes/get-notes";
import { useNotesStore } from "~/stores/notes/noteStore";
import { useEffect } from "react";
import { message } from "antd";

const UpdateNoteModal = () => {
  const [form] = Form.useForm();
  const { data: notes } = useNotes({});
  const { openUpdateModal, setOpenUpdateModal, note } = useNotesStore(
    (state) => state
  );
  const mutation = useUpdateNote({
    onSuccess: () => {
      message.success("Note change recorded successfully");
    },
    onError: () => {
      message.error("Failed to update note");
    },
  });

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      noteIndex: note.noteIndex,
      createAt: note.createAt,
    };
    mutation.mutate({
      id: note.noteID,
      data: formattedValues,
    });
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    if (note) {
      form.setFieldsValue({
        ...note,
      });
    }
  }, [note, form]);
  return (
    <Modal
      title="Edit Note"
      visible={openUpdateModal}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: "Please input the content!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateNoteModal;
