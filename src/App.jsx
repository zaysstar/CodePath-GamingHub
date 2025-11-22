// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import CreatePost from './CreatePost';
import PostDetails from './PostDetails';
import EditPost from './EditPost';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <h1>👾 Gaming Hub</h1>
          <div className="links">
            <Link to="/">Home Feed</Link>
            <br></br>
            <br></br>
            <Link to="/new">New Quest</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;