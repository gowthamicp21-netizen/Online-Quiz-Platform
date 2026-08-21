# 📝 Online Quiz Platform

An online quiz management platform developed using **Spring Boot, React, and PostgreSQL**.

The application allows administrators to manage categories, quizzes, questions, and options, while users can register, log in, select quizzes, attend quizzes, and view their quiz experience.

---

## 🚀 Features

### 👤 User Features

- User Registration
- User Login
- JWT-based Authentication
- Forgot Password
- Browse Quiz Categories
- View Available Quizzes
- Start Quiz
- Attend Quiz
- Timer-based Quiz
- Select Answers
- Submit Quiz
- Automatic Quiz Flow

### 👨‍💼 Admin Features

- Admin Login
- Admin Dashboard
- Manage Categories
  - Add Category
  - View Categories
  - Update Category
  - Delete Category
- Manage Quizzes
  - Add Quiz
  - View Quiz
  - Update Quiz
  - Delete Quiz
- Manage Questions
  - Add Questions
  - View Questions by Category
  - Update Questions
  - Delete Questions
- Manage Question Options
- Support for different question types:
  - `MCQ_SINGLE`
  - `MCQ_MULTIPLE`
  - `TRUE_FALSE`

---

## 🛠️ Technology Stack

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST API
- JWT Authentication
- Maven

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

### Database

- PostgreSQL

### Development Tools

- IntelliJ IDEA
- Visual Studio Code
- Git
- GitHub
- Postman

---

## 🏗️ Project Architecture

The application follows a client-server architecture.

```text
                ┌─────────────────────┐
                │      React UI       │
                │     Frontend        │
                └──────────┬──────────┘
                           │
                           │ REST API
                           ▼
                ┌─────────────────────┐
                │    Spring Boot      │
                │      Backend        │
                ├─────────────────────┤
                │ Controllers         │
                │ Services            │
                │ Repositories        │
                │ Security / JWT      │
                │ Entities            │
                └──────────┬──────────┘
                           │
                           │ JPA / Hibernate
                           ▼
                ┌─────────────────────┐
                │     PostgreSQL      │
                │      Database       │
                └─────────────────────┘
