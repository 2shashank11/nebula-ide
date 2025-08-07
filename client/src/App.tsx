import React from 'react'
import './App.css'; 
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import OpenRoute from './components/OpenRoute';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/SignupPage';
import AuthInitializer from './components/AuthInitializer';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Friends from './pages/Friends';
import Account from './pages/Account';
import ProjectWorkspace from './pages/ProjectWorkspace';



const App: React.FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />

        <Route element={<OpenRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/account" element={<Account />} />
          <Route path="/sandbox/:projectId" element={<ProjectWorkspace />} />
        </Route>


        <Route path="*" element={<div>404 Not Found</div>} />


      </>
    )
  )

  return (
    <>
      <AuthInitializer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
