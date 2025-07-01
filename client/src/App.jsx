import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom'
import ProyectosPage from './pages/Proyecto'
import IngenierosPage from './pages/Ingeniero'
import DepartamentosPage from './pages/Departamento'
function App() {
  

  return (

     <Router>
        <nav className= " flex row p-4 bg-gray-200">
        <Link to="/departamentos" className="mr-4">Departamentos</Link>
        <Link to="/proyectos" className="mr-4">Proyectos</Link>
        <Link to="/ingenieros" className="mr-4">Ingenieros</Link>

      </nav>
      <Routes>
        <Route path="/proyectos" element={<ProyectosPage />} />
        <Route path="/ingenieros" element={<IngenierosPage />} />
        <Route path="/departamentos" element={<DepartamentosPage />} />
      </Routes>
    </Router>
  )
}

export default App
