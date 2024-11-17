import { Button, Form, Input, Modal} from "antd";
import { useCreateNote } from "~/api/notes/create-note";
import { useNotes } from "~/api/notes/get-notes";
import { useNotesStore } from "~/stores/notes/noteStore";
import { message } from "antd";
import moment from "moment";

const CreateNoteModal = () => {
  const [form] = Form.useForm();
  const { openCreateModal, setOpenCreateModal } = useNotesStore();
  const { data: notes } = useNotes({});

  const mutation = useCreateNote({
    onSuccess: () => {
      form.resetFields();
      setOpenCreateModal(false);
      message.success("New note added successfully");
    },
    onFinish: () => {
      message.error("Failed to add new note");
    },
  });

  const onFinish = (values) => {
    const listNotes = notes || [];
    const now = moment(new Date()).format('YYYY-MM-DD ');
    console.log(now);
    const formattedValues = {
      ...values,
      noteIndex: listNotes.length + 1,
      createAt:now,
    };
    console.log("Create", formattedValues);
    mutation.mutate(formattedValues);
  };
  return (
    <Modal
      title="Add Note"
      visible={openCreateModal}
      onCancel={() => setOpenCreateModal(false)}
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
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateNoteModal;
