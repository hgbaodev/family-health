import { Button, Empty, Flex, Image, Input, message } from "antd";
import { CloseOutlined, UploadOutlined, FileOutlined, DownloadOutlined } from "@ant-design/icons";
import { useMedicalRecordsStore } from '~/stores/medicalRecordStore';
import { useUploadFile } from "~/api/medical-records/upload-file-records";
import { useState } from "react";

const DocumentList = () => {
  const [ position, setPosition ] = useState(1);
  const { 
    listDocument, 
    handleFileChange, 
    handleInputDocumentChange, 
    addDocument, 
    removeDocument,
    handleUrlFileChange
  } = useMedicalRecordsStore((state) => state);

  const { mutate: uploadFile } = useUploadFile({
    onSuccess: (data) => {
      message.success("File uploaded successfully");
      handleUrlFileChange(position, data);
    },
    onError: (error) => {
      message.error(`Failed to upload file: ${error.message}`);
      removeDocument(position);
    },
  });

  const handleFileUpload = async (position, file) => {
    if (!file) return;
    setPosition(position);
    uploadFile(file);
  };

  const onFileChange = (position, file) => {
    if (file) {
      handleFileChange(position, file);
      handleFileUpload(position, file);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {listDocument.length > 0 ? (
        <Flex vertical gap={4}>
          {listDocument.map((document) => (
            <div 
              key={document.position}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors"
            >
              <Flex align="center" gap={4}>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                  <span className="font-medium text-gray-600">{document.position}</span>
                </div>
                
                <Input
                  placeholder="Tên tài liệu"
                  value={document.name}
                  onChange={(e) =>
                    handleInputDocumentChange(document.position, "name", e.target.value)
                  }
                  className="w-64"
                  prefix={<FileOutlined className="text-gray-400" />}
                />

                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => onFileChange(document.position, e.target.files?.[0])}
                    className="hidden"
                    style={{ display: 'none' }}
                    id={`file-${document.position}`}
                  />
                  <label
                    htmlFor={`file-${document.position}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  >
                    <UploadOutlined />
                    {document.file ? 'Thay đổi file' : 'Chọn file'}
                  </label>
                </div>

                {document.type && (
                  <div className="px-3 py-1 bg-gray-50 rounded-full text-sm text-gray-500">
                    {document.type.split('/')[1].toUpperCase()} - {(document.size / 1024 / 1024).toFixed(2)}MB
                  </div>
                )}

                {document.path && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      width={"100%"}
                      height={"100$"}
                      src={document.path} 
                      alt={document.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {document.path && (
                  <Button
                    type="link"
                    href={document.path}
                    target="_blank"
                    download
                    icon={<DownloadOutlined />}
                  >
                    Tải xuống
                  </Button>
                )}

                <Button
                  type="text"
                  onClick={() => removeDocument(document.position)}
                  icon={<CloseOutlined />}
                  danger
                  className="ml-auto"
                />
              </Flex>
            </div>
          ))}
        </Flex>
      ) : (
        <Flex justify="center" align="center" className="py-12">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          />
        </Flex>
      )}

      <Flex justify="center" className="mt-6">
        <Button 
          type="dashed"
          onClick={addDocument}
          icon={<UploadOutlined />}
          size="large"
          className="min-w-40"
        >
          Thêm tài liệu
        </Button>
      </Flex>
    </div>
  );
};

export default DocumentList;
