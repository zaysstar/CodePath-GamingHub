import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './CreatePost.css'; // We'll reuse the form styles

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [flag, setFlag] = useState("Guide");

  const createPost = async (e) => {
    e.preventDefault();
    
    // Validation: Ensure basic fields are there
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }

    await addDoc(collection(db, "posts"), {
  title,
  content,
  imageURL,
  secretKey,
  flag, // <--- NEW: Save the category
  upvotes: 0,
  createdAt: new Date()
});

    window.location.href = "/"; // Redirect to Home
  };

  return (
    <div className="create-post-page">
      <h2>⚔️ Create New Quest</h2>
      <form onSubmit={createPost}>
        <input 
          type="text" 
          placeholder="Quest Title (e.g., 'Secret Boss in Level 4')" 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />

<label>Quest Type:</label>
      <select value={flag} onChange={(e) => setFlag(e.target.value)} className="flag-select">
        <option value="Guide">📘 Guide/Walkthrough</option>
        <option value="Opinion">💭 Opinion/Review</option>
        <option value="Question">❓ Question/Help</option>
        <option value="Fluff">🤣 Fluff/Meme</option>
      </select>
      
        <textarea 
          placeholder="Walkthrough / Description..." 
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
        />
        <input 
          type="text" 
          placeholder="Image URL (Optional)" 
          onChange={(e) => setImageURL(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Secret Key (Password for Editing/Deleting)" 
          onChange={(e) => setSecretKey(e.target.value)} 
          required
        />
        <button type="submit">Create Quest</button>
      </form>
    </div>
  );
}

export default CreatePost;