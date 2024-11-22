import { useState } from "react";
import { Input, Button, Avatar, Spin } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import { useChatAi } from "~/api/ai/chat-ai";
import Markdown from "react-markdown";
import { useChatAiStore } from "~/stores/chatAiStore";

const ChatPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { messages, addMessage } = useChatAiStore((state) => state);

  const mutate = useChatAi({
    onSuccess: (data) => {
      setLoading(false);
      let text = data?.data;
      addMessage({
        sender: "ai",
        text: text || "Xin lỗi, tôi không hiểu câu hỏi của bạn",
      });
    },
    onError: () => {
      setLoading(false);
      addMessage({
        sender: "ai",
        text: "Xin lỗi, đã xảy ra lỗi khi xử lý câu hỏi của bạn",
      });
    },
  });

  const handleSend = async () => {
    if (inputValue.trim()) {
      addMessage({ sender: "user", text: inputValue });
      setLoading(true);
      await mutate.mutate({ question: inputValue });
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 content">
      <div className="flex-grow overflow-auto p-4 bg-white rounded shadow">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400">
            Hãy bắt đầu cuộc trò chuyện
          </div>
        ) : (
          <div>
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  item.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start ${
                    item.sender === "ai" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <Avatar
                    icon={
                      item.sender === "ai" ? (
                        <RobotOutlined />
                      ) : (
                        <UserOutlined />
                      )
                    }
                    className={item.sender === "ai" ? "mr-2" : "ml-2"}
                  />
                  <Markdown
                    className={`p-2 rounded ${
                      item.sender === "user" ? "mr-2" : "ml-2"
                    } ${
                      item.sender === "ai" ? "bg-green-100" : "bg-blue-100"
                    } max-w-xl break-words`}
                  >
                    {item.text}
                  </Markdown> 
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-2">
                <div className="flex items-center">
                  <Avatar icon={<RobotOutlined />} className="mr-2" />
                  <Spin />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex mt-4">
        <Input
          className="flex-grow mr-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSend}
        />
        <Button type="primary" onClick={handleSend}>
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
