import Hero from "./landing page/Hero Section/Hero"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./dashboard/Dashboard";
import CalendarPage from "./calendar page/CalendarPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:id" element={<CalendarPage />} />
      </Routes>
    </Router>
  )
}

export default App
