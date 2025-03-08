# Personal Finance Manager

## Introduction
Personal Finance Manager is a web application designed to help users track their expenses and manage their finances efficiently. It provides an intuitive interface to add, update, and delete expenses, along with insightful charts for spending distribution.

## Technologies Used

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) **Node.js** - Backend server runtime
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) **Express.js** - Web framework for Node.js
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB** - NoSQL database for storing financial records
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) **React** - Frontend framework for UI development
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) **Bootstrap** - Styling framework for responsive design
- ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white) **Chart.js** - Used for visualizing expenses

## Features

- 📌 **Expense Tracking** - Add, update, and delete expenses easily.
- 📊 **Data Visualization** - View expense distribution with interactive charts.
- 🌎 **Multi-Currency Support** - Supports transactions in Indian Rupees.
- 🔐 **Secure Storage** - Uses MongoDB for secure data management.
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop.

## Installation & Setup

1. **Clone the Repository**
```bash
git clone https://github.com/Vrushadree10/Personal-Finance-Manager.git
cd Personal-Finance-Manager
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

4. **Environment Variables**
Create a `.env` file in the `backend/` directory and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

5. **Run the Application**
```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd ../frontend
npm start
```

## Deployment
To deploy, push changes to GitHub and use a hosting platform like **Vercel** (for frontend) and **Render** (for backend).

## Contribution
Feel free to submit issues or open pull requests to improve the project.

---
**🔗 GitHub Repository:** [Personal Finance Manager](https://github.com/Vrushadree10/Personal-Finance-Manager)

