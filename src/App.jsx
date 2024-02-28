import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './componentes/privateRoute'
import PartidoVista from './vista/PartidosVista.jsx';
import AdminLogin from './vista/adminLogin.jsx';
import './App.scss';
import AdminHome from './vista/adminHome.jsx';
import AdminApuestas from './vista/adminApuestas.jsx';
import AdminEquipos from './vista/adminEquipos.jsx';
import AdminPartidos from './vista/adminPartidos.jsx';

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" >
              <Route index element={<h1>Bienvenido a BarrioBet</h1>}></Route>
              <Route path=":idPartido" element={<PartidoVista></PartidoVista>}></Route>

              <Route path="admin">
                <Route index element={<AdminLogin></AdminLogin>}></Route>
                <Route path='home' element={<AdminHome></AdminHome>}></Route>
                <Route path='apuestas' element={<AdminApuestas></AdminApuestas>}></Route>
                <Route path='equipos' element={<AdminEquipos></AdminEquipos>}></Route>
                <Route path='partidos' element={<AdminPartidos></AdminPartidos>}></Route>
              </Route>

            </Route>
            <Route path='*' element={<h1>404 Not Found</h1>}></Route>
          </Routes>
        </Router>
     
    </>
  )
}

export default App

