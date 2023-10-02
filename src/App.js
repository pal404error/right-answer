import logo from './logo.svg';
import './App.css';
import LogIn from './components/login';
import Forgot from './components/forgot';
import { Route, Routes, useRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Template from './components/template';
import Home from "./user_side/pages/Home";
import Gujrati from './user_side/pages/Gujrati';
import PrivateRoute from './PrivateRoute';
import {AuthProvider} from './Authcontext/Authcontext';

function App() {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    
    <Routes>
    
      <Route exact path="/login" element={<Template/>}/>
      {/* <Route exact path="/" element={<Template/>}/> */}
      <Route exact path="/reset" element={<Forgot/>}/>
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>}/>
      <Route path="/Gujrati" element={<Gujrati/>} />
      
    </Routes>
    
    </BrowserRouter>
    </AuthProvider>
    
    </>
  );
}

export default App;