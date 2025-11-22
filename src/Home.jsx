// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('createdAt');
  const [loading, setLoading] = useState(true);
  const [filterFlag, setFilterFlag] = useState("All");

  // 1. State for the Search Bar
  const [searchQuery, setSearchQuery] = useState(""); // <--- SEARCH FEATURE

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy(sortType, "desc"));
      const querySnapshot = await getDocs(q);
      
      const postsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPosts(postsList);
      setLoading(false);
    };

    fetchPosts();
  }, [sortType]);

  // 2. The Logic to Filter Posts based on Title
const filteredPosts = posts.filter(post => {
  const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesFlag = filterFlag === "All" || post.flag === filterFlag;
  
  return matchesSearch && matchesFlag;
});

  return (
    <div className="home-container">
      <div className="controls-section">
        <div className="filter-buttons">
    <button onClick={() => setFilterFlag("All")} className={filterFlag === "All" ? "active" : ""}>All</button>
    <button onClick={() => setFilterFlag("Guide")}>📘 Guides</button>
    <button onClick={() => setFilterFlag("Opinion")}>💭 Opinions</button>
    <button onClick={() => setFilterFlag("Question")}>❓ Help</button>
  </div>

        {/* 3. The Search Input Field */}
        <input 
          type="text" 
          placeholder="🔍 Search Quests by Title..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // <--- SEARCH FEATURE
          className="search-bar"
        />
        
        <div className="sort-buttons">
          <button 
            onClick={() => setSortType('createdAt')}
            className={sortType === 'createdAt' ? 'active' : ''}
          >
            Newest
          </button>
          <button 
            onClick={() => setSortType('upvotes')}
            className={sortType === 'upvotes' ? 'active' : ''}
          >
            Top Rated
          </button>
        </div>
      </div>
      
      {loading ? (
  <div className="loading-spinner"></div>
) : (
        <div className="posts-grid">
          {/* 4. We map through 'filteredPosts' instead of 'posts' */}
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="card">
                {post.imageURL && <img src={post.imageURL} alt="preview" className="card-img"/>}
                <div className="card-content">
                  <h3>{post.title}</h3>
                  <div className="card-meta">
                    <span>📅 {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                    <span className="xp-badge">✨ {post.upvotes} XP</span>
                  </div>
                  <Link to={`/post/${post.id}`} className="view-btn">View Strategy</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>❌ No quests found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;