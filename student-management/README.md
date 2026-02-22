# Student Management System - Full Stack

A complete full-stack application for managing students with courses and years.

## Project Structure

```
student-management/
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React context for state management
│   │   ├── styles/     # CSS files
│   │   └── App.jsx
│   └── package.json
└── backend/            # Express API
    ├── server.js       # Express server
    ├── database.sql    # MySQL schema
    ├── .env            # Environment variables
    └── package.json
```

## Setup Instructions

### 1. Database Setup (MySQL)

- Install MySQL if not already installed
- Open MySQL shell or MySQL Workbench
- Run the SQL script:

```bash
mysql -u root -p < backend/database.sql
```

Or copy and paste the contents of `backend/database.sql` into MySQL.

Update the `.env` file in the backend folder with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=student_management
DB_PORT=3306
PORT=5000
```

### 2. Backend Setup

Navigate to backend folder and install dependencies:

```bash
cd backend
npm install
```

Start the backend server:

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The API will run on `http://localhost:5000`

### 3. Frontend Setup

Navigate to frontend folder and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Add new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/courses` - Get available courses
- `GET /api/health` - Health check

## Features

- ✅ Add new students with name, course, and year
- ✅ View all students in a list
- ✅ Edit student information
- ✅ Delete students
- ✅ Select from predefined courses (BSIS, BSIT, BSCS)
- ✅ Select year (1-4)
- ✅ Responsive UI design
- ✅ Real-time database synchronization

## Technologies Used

**Frontend:**
- React 18
- Vite
- Axios for HTTP requests
- CSS3

**Backend:**
- Express.js
- Node.js
- MySQL2 for database connection
- CORS for cross-origin requests
- Dotenv for environment variables

**Database:**
- MySQL

## Requirements

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn
