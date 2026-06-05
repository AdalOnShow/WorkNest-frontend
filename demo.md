<div align="center">

# 🎓 eTuitionBD

### Modern tuition management platform connecting students with verified tutors in Bangladesh

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://etuition-bd.web.app/)
[![Client Repo](https://img.shields.io/badge/GitHub-Client-blue?style=for-the-badge&logo=github)](https://github.com/AdalOnShow/eTuitionBD-Online_Tuition_Management_Project)
[![Server Repo](https://img.shields.io/badge/GitHub-Server-blue?style=for-the-badge&logo=github)](https://github.com/AdalOnShow/eTuitionBD-backend)

![Home Page](./home.png)

</div>

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

### Frontend Technologies

| Technology                                                                                                              | Description            |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                     | UI Library (v19)       |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                         | Build Tool             |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) | Routing (v7)           |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  | Styling Framework (v4) |
| ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)                | Component Library      |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)             | Authentication         |
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) | Data Fetching        |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white) | Form Handling    |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)                      | HTTP Client            |
| ![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react&logoColor=white)          | Icon Library           |
| ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-7066E0?style=for-the-badge)                                     | Modal Dialogs          |
| ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)                     | Animation Library      |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)                   | Code Linting           |

</td>
<td width="50%" valign="top">

### Backend Technologies

| Technology                                                                                                              | Description          |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)              | Runtime Environment  |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)          | Web Framework        |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                | NoSQL Database       |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)                   | Authentication       |
| ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)                   | Payment Processing   |
| ![CORS](https://img.shields.io/badge/CORS-Enabled-green?style=for-the-badge)                                            | Cross-Origin Support |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                   | Deployment Platform  |

</td>
</tr>
</table>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Installation](#-installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 📃 About the Project

**eTuitionBD** is a modern tuition management platform connecting students with verified tutors in Bangladesh. The platform facilitates the entire tutoring process from posting tuition requirements to payment processing.

The system is designed for students seeking quality education, tutors looking for teaching opportunities, and administrators managing the platform. Built with a strong focus on user experience, secure transactions, and efficient matching between students and tutors.

### 🎯 Project Objectives

- Build a comprehensive tuition management platform featuring role-based dashboards, secure payment processing, application management, and real-time communication
- **Target Audience:** Students, Tutors, and Educational Administrators in Bangladesh
- **Deployment:** Frontend on Firebase Hosting, Backend on Vercel

### 📊 Key Metrics

✅ Role-Based Access Control  
✅ Secure Payment Processing (Stripe)  
✅ Real-time Application Management  
✅ Firebase Authentication  
✅ Responsive Design  
✅ Protected Routes  
✅ RESTful API Architecture

---

## ✨ Key Features

### 1. 🔐 Authentication System (Firebase)

- Email/Password registration and login
- Role-based authentication (Student, Tutor, Admin)
- Auth persistence and protected routes
- Profile management

### 2. 👨‍🎓 Student Portal

- Post tuition requirements with detailed specifications
- Browse and filter available tutors
- Manage tuition applications and responses
- Secure payment processing via Stripe
- Track ongoing tuitions and payment history

### 3. 👩‍🏫 Tutor Portal

- Browse available tuition opportunities
- Apply for tuitions with detailed proposals
- Manage ongoing teaching sessions
- Track earnings and payment history
- Profile verification and rating system

### 4. 🛡️ Admin Dashboard

- User management and verification
- Tuition oversight and moderation
- Platform analytics and reporting
- Payment transaction monitoring
- Content management

### 5. 🔍 Advanced Search & Filter

- Search tuitions by subject, location, salary range
- Filter tutors by qualifications, experience, rating
- Location-based matching
- Advanced filtering options

### 6. 💳 Payment System

- Secure payment processing with Stripe
- Commission-based transaction model
- Payment history and invoicing
- Refund and dispute management

### 7. 📱 Responsive Design

- Mobile-first responsive design
- Optimized for all device sizes
- Touch-friendly interface
- Fast loading performance

### 8. 🎨 Additional Features

- Real-time notifications
- Rating and review system
- Advanced form validation
- Loading states and error handling
- Dark/Light theme support

---

## 📁 Project Structure

```
eTuitionBD/
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── form/           # Form-specific components
│   │   │   ├── modals/         # Modal components
│   │   │   └── shared/         # Shared components (Navbar, Footer)
│   │   ├── pages/              # Page components
│   │   │   ├── public/         # Public pages (Home, AllTuitions)
│   │   │   ├── auth/           # Authentication pages
│   │   │   └── dashboard/      # Dashboard pages by role
│   │   │       ├── student/    # Student-specific pages
│   │   │       ├── tutor/      # Tutor-specific pages
│   │   │       └── admin/      # Admin-specific pages
│   │   ├── layouts/            # Layout components
│   │   ├── routes/             # Routing configuration
│   │   ├── contexts/           # React contexts
│   │   ├── hook/               # Custom hooks
│   │   ├── config/             # Configuration files
│   │   ├── data/               # Static data
│   │   ├── utils/              # Utility functions
│   │   └── provider/           # Context providers
│   ├── public/                 # Static assets
│   ├── dist/                   # Build output
│   └── [config files]         # Vite, Tailwind, ESLint configs
│
└── backend/                     # Express Backend
    ├── index.js                 # Main server file with all routes
    ├── .env                     # Environment variables
    ├── package.json             # Dependencies
    ├── vercel.json              # Vercel deployment config
    └── node_modules/            # Dependencies
```

---

## 📡 API Documentation

### Base URL

```
Production: https://e-tuition-bd-server-tau.vercel.app
Local: http://localhost:3000
```

### Authentication

Protected routes require JWT token in header:

```
Authorization: Bearer <jwt_token>
```

### Endpoints

#### Authentication

| Method | Endpoint | Auth | Description        |
| ------ | -------- | ---- | ------------------ |
| `POST` | `/jwt`   | ❌   | Generate JWT token |

#### Users

| Method   | Endpoint     | Auth | Description           |
| -------- | ------------ | ---- | --------------------- |
| `GET`    | `/users`     | ✅   | Get all users         |
| `GET`    | `/user/:id`  | ✅   | Get user by ID        |
| `GET`    | `/tutors`    | ❌   | Get all tutors        |
| `POST`   | `/users`     | ✅   | Create new user       |
| `PATCH`  | `/user/:id`  | ✅   | Update user profile   |
| `DELETE` | `/user/:id`  | ✅   | Delete user           |

#### Tuitions

| Method   | Endpoint       | Auth | Description              |
| -------- | -------------- | ---- | ------------------------ |
| `GET`    | `/tuitions`    | ❌   | Get all tuitions         |
| `GET`    | `/tuition/:id` | ❌   | Get tuition by ID        |
| `POST`   | `/tuitions`    | ✅   | Create new tuition       |
| `PATCH`  | `/tuition/:id` | ✅   | Update tuition           |
| `DELETE` | `/tuition/:id` | ✅   | Delete tuition           |

#### Applications

| Method | Endpoint          | Auth | Description                |
| ------ | ----------------- | ---- | -------------------------- |
| `GET`  | `/applications`   | ✅   | Get user's applications    |
| `POST` | `/apply-tuition`  | ✅   | Apply for tuition          |

#### Payments

| Method | Endpoint                    | Auth | Description                |
| ------ | --------------------------- | ---- | -------------------------- |
| `GET`  | `/payments`                 | ✅   | Get payment history        |
| `POST` | `/create-checkout-session` | ✅   | Create Stripe session      |
| `POST` | `/payment-success`          | ✅   | Handle successful payment  |

---

## ⚙️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB account
- Firebase account
- Stripe account

### Frontend Setup

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the `frontend` directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

4. **Run the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

6. **Preview production build**

```bash
npm run preview
```

---

### Backend Setup

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `backend` directory:

```env
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_API_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
PORT=3000
```

4. **Run the server**

```bash
node index.js
```

The server will start on `http://localhost:3000`

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

### Steps to Contribute

1. **Fork the Project**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---
## 📬 Contact

**Sharif Adal**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adalonshow/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sharifadal2008@gmail.com)


### 🔗 Project Links

- **Live Demo:** [https://etuition-bd.web.app/](https://etuition-bd.web.app/)
- **Client Repository:**
  [eTuitionBD Client](https://github.com/AdalOnShow/eTuitionBD-Online_Tuition_Management_Project)
- **Server Repository:**
  [eTuitionBD Server](https://github.com/AdalOnShow/eTuitionBD-backend)

---

<div align="center">

Made with ❤️ by [Sharif Adal](https://github.com/AdalOnShow)

⭐ Star this repo if you find it helpful!

</div>