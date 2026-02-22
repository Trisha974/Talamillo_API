import React, { useState, useEffect } from 'react';
import { useStudents } from './StudentContext';
import './App.css';

const StudentForm = ({ student, onClose, onSave }) => {
	const [formData, setFormData] = useState({ name: '', course: '', year: '' });
	const { courses } = useStudents();

	useEffect(() => {
		if (student) {
			setFormData(student);
		}
	}, [student]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === 'year' ? parseInt(value) : value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
		setFormData({ name: '', course: '', year: '' });
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<span className="close" onClick={onClose}>&times;</span>
				<h2>{student ? 'Edit Student' : 'Add New Student'}</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Name:</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Enter student name"
							required
						/>
					</div>
					<div className="form-group">
						<label>Course:</label>
						<select
							name="course"
							value={formData.course}
							onChange={handleChange}
							required
						>
							<option value="">Select Course</option>
							{courses.map(c => (
								<option key={c.id} value={c.name}>{c.name}</option>
							))}
						</select>
					</div>
					<div className="form-group">
						<label>Year:</label>
						<select
							name="year"
							value={formData.year}
							onChange={handleChange}
							required
						>
							<option value="">Select Year</option>
							{[1, 2, 3, 4].map(y => (
								<option key={y} value={y}>Year {y}</option>
							))}
						</select>
					</div>
					<div className="form-buttons">
						<button type="submit" className="btn btn-primary">
							{student ? 'Update' : 'Add'} Student
						</button>
						<button type="button" onClick={onClose} className="btn btn-secondary">
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default StudentForm;
