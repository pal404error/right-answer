import logo from './logo.svg';
import './App.css';
import LogIn from './components/login';
import Forgot from './components/forgot';
import { Route, Routes, useRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Template from './components/template';
import Home from "./user_side/pages/Home";
import Gujrati from './user_side/pages/Gujrati';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="login" element={<Template/>}/>
      <Route exact path="" element={<Template/>}/>
      <Route exact path="reset" element={<Forgot/>}/>
      <Route path="/Home" element={<Home />} />
      <Route path="/Gujrati" element={<Gujrati/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;