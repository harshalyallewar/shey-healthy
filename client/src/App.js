import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import {Box, CircularProgress} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux';
import PublicRoutes from "./components/publicRoutes";
import ProtectedRoutes from './components/protectedRoutes';
import Layout from './components/layout';
import ApplyDoctor from './pages/ApplyDoctor';
import Doctors from './pages/admin/Doctors';
import Notifications from './pages/Notifications';
import Users from './pages/admin/Users';
import Logout from './pages/logout';
import DoctorProfile from'./pages/doctor/doctorProfile';
import BookAppointments from './pages/BookAppointments';
import DoctorAppointments from './pages/doctor/doctorAppointment';
import UserAppointments from './pages/UserAppointments'

function App() {
   const {loading} = useSelector(state=>state.alerts);

  return (
    <BrowserRouter>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0, 0, 0, 0.704)",
          }}
        >
          <CircularProgress size={70} />
        </Box>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoutes>
              <Logout />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoutes>
              <ApplyDoctor />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoutes>
              <Notifications />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/doctorslist"
          element={
            <ProtectedRoutes>
              <Doctors />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoutes>
              <Users />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoutes>
              <DoctorProfile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoutes>
              <BookAppointments />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoutes>
              <DoctorAppointments />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/user/appointments"
          element={
            <ProtectedRoutes>
              <UserAppointments />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
