import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
	const [students, setStudents] = useState([]);
	const [courses, setCourses] = useState([]);
	const API_URL = 'http://localhost:5000/api';
	const [deletedStudents, setDeletedStudents] = useState([]);

	const fetchStudents = async () => {
		try {
			const response = await axios.get(`${API_URL}/students`);
			setStudents(response.data);
		} catch (error) {
			console.error('Error fetching students:', error);
		}
	};

	const fetchDeletedStudents = async () => {
		try {
			const response = await axios.get(`${API_URL}/students/deleted`);
			setDeletedStudents(response.data);
		} catch (error) {
			setDeletedStudents([]);
			console.error('Error fetching deleted students:', error);
		}
	};

	const fetchCourses = async () => {
		try {
			const response = await axios.get(`${API_URL}/courses`);
			setCourses(response.data);
		} catch (error) {
			console.error('Error fetching courses:', error);
		}
	};

	const addStudent = async (student) => {
		try {
			const response = await axios.post(`${API_URL}/students`, student);
			setStudents([...students, { id: response.data.id, ...student }]);
			return response.data;
		} catch (error) {
			console.error('Error adding student:', error);
			throw error;
		}
	};

	const updateStudent = async (id, student) => {
		try {
			await axios.put(`${API_URL}/students/${id}`, student);
			setStudents(students.map(s => s.id === id ? { id, ...student } : s));
		} catch (error) {
			console.error('Error updating student:', error);
			throw error;
		}
	};

	const deleteStudent = async (id) => {
		try {
			await axios.delete(`${API_URL}/students/${id}`);
			// Refetch students to update list after soft delete
			await fetchStudents();
		} catch (error) {
			console.error('Error deleting student:', error);
			throw error;
		}
	};

	return (
		<StudentContext.Provider value={{
			students,
			courses,
			deletedStudents,
			fetchStudents,
			fetchCourses,
			fetchDeletedStudents,
			addStudent,
			updateStudent,
			deleteStudent
		}}>
			{children}
		</StudentContext.Provider>
	);
};

export const useStudents = () => useContext(StudentContext);
