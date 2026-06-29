import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Users from './components/Users'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Workouts from './components/Workouts'
import Leaderboard from './components/Leaderboard'

function Home() {
  return (
    <section>
      <h1>OctoFit Tracker</h1>
      <p>Welcome — select a section from the navigation.</p>
    </section>
  )
}

function App() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/workouts">Workouts</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>

      <div className="banner">
        <small>
          API base:{' '}
          {codespace
            ? `https://${codespace}-8000.app.github.dev/api/` 
            : `http://localhost:8000/api/ (VITE_CODESPACE_NAME unset)`}
        </small>
      </div>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
