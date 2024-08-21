import Hero from "./landing page/Hero Section/Hero"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
