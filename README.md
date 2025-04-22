# 🏫 CampusFix – Maintenance Management Web App

CampusFix is a full-stack web application that streamlines the process of reporting and resolving maintenance issues within a campus. Built with modern technologies, it enables students to easily log issues and service staff to manage them efficiently.

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- **React (Vite)**

### 🧠 Backend
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Nodemailer (Email Notifications)**

---

## 🚀 How to Run the Project Locally

### 🔁 1. Clone the Repository
```bash
git clone https://github.com/yourusername/campusfix.git
cd campusfix
```

### 🖥️ 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
- Frontend will run on: [http://localhost:5173/](http://localhost:5173/)

### 🧠 3. Run the Backend
```bash
cd ../backend
npm install
npm run start
```
- Backend will run on: [http://localhost:5000/](http://localhost:5000/)

⚠️ **Make sure MongoDB is running locally or configure your MongoDB URI in `.env`.**

---

## 🔐 Login Instructions

### 🧑‍🔧 Service Staff (Electrician)
- **Email:** tharunnani3333@gmail.com  
- **Password:** 123456

### 🎓 Student Login
- Use any working Gmail address.
- Enter any password.
- You will receive an email notification after submitting a request.  
  *(Email is sent using Nodemailer.)*

---

## 📩 Features Overview

### For Students:
- Submit maintenance requests (room number, issue type, description).
- Track the status of submitted requests.

### For Service Staff:
- View and manage all maintenance requests.
- Filter requests by service type (Electrician, Plumber, Carpenter, etc.).
- Mark tasks as completed.

---

## 🌐 Live Demo
🔗 **[CampusFix Live](#)** *(Add the live demo link here)*

---

## 🤝 Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork** the repository.
2. Create a **new branch** for your feature or bug fix.
3. Submit a **pull request**.

---

## 📄 .env Sample Setup

Create a `.env` file in the `backend` folder with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## 🎨 Made with ❤️ to simplify campus maintenance!
