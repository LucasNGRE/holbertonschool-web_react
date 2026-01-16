import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

const initialState = {
  courses: [],
};

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

// Thunk pour récupérer les cours
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get(ENDPOINTS.courses);
    // Ajout de la propriété isSelected à chaque cours
    return response.data.courses.map(course => ({ ...course, isSelected: false }));
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    selectCourse: (state, action) => {
      const course = state.courses.find(course => course.id === action.payload);
      if (course) course.isSelected = true;
    },
    unSelectCourse: (state, action) => {
      const course = state.courses.find(course => course.id === action.payload);
      if (course) course.isSelected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(logout, (state) => {
        state.courses = [];
      });
  },
});

export const { selectCourse, unSelectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
