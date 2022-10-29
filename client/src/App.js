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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
