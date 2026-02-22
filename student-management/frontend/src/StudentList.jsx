import React, { useEffect, useState } from 'react';
import { useStudents } from './StudentContext';
import './App.css';
import './material-icons.css';

const StudentList = ({ onEdit, onAddClick }) => {
	const { students, fetchStudents, deleteStudent, deletedStudents, fetchDeletedStudents } = useStudents();
	const [showDeleted, setShowDeleted] = useState(false);

	useEffect(() => {
		fetchStudents();
		if (showDeleted) fetchDeletedStudents();
	}, [showDeleted]);

	const handleDelete = (id) => {
		if (confirm('Are you sure you want to delete this student?')) {
			deleteStudent(id);
		}
	};

	const handleRestore = async (id) => {
		try {
			await fetch(`http://localhost:5000/api/students/${id}/restore`, { method: 'PUT' });
			fetchDeletedStudents();
			fetchStudents();
		} catch (error) {
			alert('Error restoring student');
		}
	};

	return (
		<div className="student-list">
			<div className="student-list-header-row">
				<h2>Student List</h2>
				<div className="student-list-header-actions">
					<button className="btn btn-add" onClick={onAddClick}>
						<span className="material-icons" style={{ verticalAlign: 'middle', fontSize: 20, marginRight: 6 }}>add</span>
						Add New Student
					</button>
					<button className="btn btn-secondary" onClick={() => setShowDeleted(!showDeleted)}>
						<span className="material-icons" style={{ verticalAlign: 'middle', fontSize: 20, marginRight: 6 }}>{showDeleted ? 'visibility_off' : 'visibility'}</span>
						{showDeleted ? 'Hide Deleted' : 'View Deleted'}
					</button>
				</div>
			</div>
			<div className="student-table-container">
				<table className="student-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Course</th>
							<th>Year</th>
							<th style={{ textAlign: 'center' }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{showDeleted
							? (
								deletedStudents.length === 0
									? <tr><td colSpan="4" className="no-students">No deleted students found</td></tr>
									: deletedStudents.map(student => (
										<tr key={student.id} className="student-row deleted-row">
											<td>{student.name}</td>
											<td>{student.course}</td>
											<td>Year {student.year}</td>
											<td className="student-actions" style={{ textAlign: 'center' }}>
												<button className="btn btn-edit" title="Restore" onClick={() => handleRestore(student.id)}>
													<span className="material-icons">restore</span>
												</button>
											</td>
										</tr>
									))
							)
							: (
								students.length === 0
									? <tr><td colSpan="4" className="no-students">No students found</td></tr>
									: students.map(student => (
										<tr key={student.id} className="student-row">
											<td>{student.name}</td>
											<td>{student.course}</td>
											<td>Year {student.year}</td>
											<td className="student-actions" style={{ textAlign: 'center' }}>
												<button className="btn btn-edit" title="Edit" onClick={() => onEdit(student)}>
													<span className="material-icons">edit</span>
												</button>
												<button className="btn btn-delete" title="Delete" onClick={() => handleDelete(student.id)}>
													<span className="material-icons">delete</span>
												</button>
											</td>
										</tr>
									))
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StudentList;
