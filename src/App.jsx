import './App.css';
import Register from './components/RegisterPage/Register';
import Login from './components/LoginPage/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Reset from './components/ResetPage/Reset';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/reset" element={<Reset />} />

      </Routes>
    </div>
  );
}

export default App;
