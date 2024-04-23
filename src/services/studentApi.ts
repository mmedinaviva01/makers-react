import axios from 'axios';
import { Student } from '../interfaces/Student';

axios.defaults.baseURL = 'http://localhost:8080/api';

export const getAllStudents = () => {
  return axios.get(`/students`).then(data => data.data._embedded);
}

export const updateStudent = (id: number, student: Student) => {
  return axios.put(`/students/${id}`, student);
}

export const getStudent = (id: number) => {
  return axios.put(`/students/${id}`);
}

export const deleteStudent = (id: number) => {
  return axios.delete(`/students/${id}`);
}

export const createStudent = (student: Student) => {
  return axios.post(`/students`, student);
}
