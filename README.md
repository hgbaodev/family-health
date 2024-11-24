# 🏥 Family Medical Log Management System  

**A modern web application for managing family medical records, built with React.js and Spring Boot.**  

## 🚀 Features  

### 🌟 Core Functionalities  
- **Family Health Management**: Add, view, edit, and delete medical records for family members.  
- **Member Profiles**: Track personal details like name, age, health metrics, and vaccination history.  
- **Drag & Drop Interface**: Intuitive interaction for managing files and organizing medical records, powered by a robust drag-and-drop library.  

### 🔐 User Authentication  
- **Google Login Integration**: Securely log in using your Google account.  
- **Email Notifications**: Automatic email updates for important health log activities.  

### 🤖 AI Integration  
- **OpenAI-Powered Insights**: Use AI to analyze and generate recommendations for health improvements.  

## 🛠️ Tech Stack  
- **Frontend**: React.js + Tailwind CSS for a responsive and dynamic UI.  
- **Backend**: Spring Boot with RESTful APIs for seamless data processing.  
- **Database**: MySql for robust data storage.  
- **Authentication**: OAuth 2.0 for Google Sign-In.  
- **Email Service**: Spring Mail for notification management.  
- **Drag-and-Drop**: Leveraging a modern library for file management UX.

## 🌐 Getting Started  

### Prerequisites  
- Node.js & npm  
- Java (JDK 11 or later)  
- MySql -> https://dbdocs.io/hgbaodev/Family-health

### Installation  

#### 1. Clone the repository  
```bash  
git clone https://github.com/hgbaodev/j2ee.git  
cd j2ee  
```  

#### 2. Set up the Backend  
```bash  
cd backend  
./mvnw spring-boot:run  
```  

#### 3. Set up the Frontend  
```bash  
cd frontend  
npm install  
npm run dev  
```  

#### 4. Configure Environment Variables  
- **Google OAuth**: Set up a Google Cloud project and add the credentials in the `.env` file.  
- **Email Service**: Provide SMTP details in the Spring Boot application properties.  
- **OpenAI API**: Add your OpenAI API key to the backend configuration.  

## 📂 Project Structure  

```
family-medical-log  
├── backend/  
│   ├── src/main/java/com/yourapp/...  
│   └── src/main/java/com/...
├── frontend/  
│   ├── src/components/...  
│   └── src/pages/...  
└── README.md  
```  

## 📸 Screenshots  

### 1. Dashboard  
![Dashboard Screenshot](path/to/dashboard-screenshot.png)  

### 2. Member Details  
![Member Details Screenshot](path/to/member-details-screenshot.png)  

### 3. AI Recommendations  
![AI Recommendations Screenshot](path/to/ai-recommendations-screenshot.png)  

## 📝 License  
This project is licensed under the MIT License.  

## 🤝 Contributing  
Contributions are welcome! Feel free to fork the repository and submit a pull request.  

## 💌 Contact  
- **Developer**: [hgbaodev](mailto:novutechvn@gmail.com)  
- **GitHub**: [GitHub Profile](https://github.com/hgbaodev)  

---

Let me know if you'd like to make any changes or add more details! 😊
