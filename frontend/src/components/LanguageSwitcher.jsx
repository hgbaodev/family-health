import { useTranslation } from "react-i18next";
import { Select } from "antd";

const { Option } = Select;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      defaultValue={i18n.language}
      style={{ width: 120 }}
      onChange={changeLanguage}
    >
      <Option value="en">English</Option>
      <Option value="vi">Tiếng Việt</Option>
    </Select>
  );
};

export default LanguageSwitcher;
