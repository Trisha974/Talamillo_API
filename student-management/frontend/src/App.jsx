import React, { useState, useEffect } from 'react';
import { StudentProvider, useStudents } from './StudentContext';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import './App.css';
import './material-icons.css';

const AppContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const { addStudent, updateStudent, fetchCourses } = useStudents();

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSaveStudent = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
      } else {
        await addStudent(formData);
      }
      setShowForm(false);
      setEditingStudent(null);
    } catch (error) {
      alert('Error saving student: ' + error.message);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Student Management System</h1>
          <button className="btn btn-logout">Logout</button>
        </div>
      </header>
      
      <main className="main-content">
        <StudentList onEdit={handleEditStudent} onAddClick={handleAddClick} />
      </main>

      {showForm && (
        <StudentForm 
          student={editingStudent}
          onClose={handleCloseForm}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}

export default App;
