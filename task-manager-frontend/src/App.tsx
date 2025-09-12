import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import type { JSX } from 'react';
import { TaskProvider } from './context/TaskContext';
import About from './pages/About';
import { Navbar } from './components/Navbar';


function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><TaskProvider><Dashboard/></TaskProvider></PrivateRoute>}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;