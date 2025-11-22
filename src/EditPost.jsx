import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './CreatePost.css'; // Reusing styles

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "", imageURL: "", secretKey: "" });
  const [loading, setLoading] = useState(true);

  // 1. Fetch the current data to fill the form
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  // 2. Handle the Update
  const updatePost = async (e) => {
    e.preventDefault();
    
    // Check Secret Key
    const secretInput = prompt("Enter the Secret Key to confirm changes:");
    if (secretInput !== post.secretKey) {
      alert("❌ Incorrect Key!");
      return;
    }

    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      title: post.title,
      content: post.content,
      imageURL: post.imageURL
    });

    navigate(`/post/${id}`); // Go back to the post page
  };

  // Helper to update state object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading Quest Data...</div>;

  return (
    <div className="create-post-page">
      <h2>🔧 Edit Quest</h2>
      <form onSubmit={updatePost}>
        <label>Title</label>
        <input 
          type="text" 
          name="title"
          value={post.title} 
          onChange={handleChange} 
        />
        
        <label>Description</label>
        <textarea 
          name="content"
          value={post.content}
          onChange={handleChange}
          rows="5"
        />
        
        <label>Image URL</label>
        <input 
          type="text" 
          name="imageURL"
          value={post.imageURL} 
          onChange={handleChange} 
        />
        
        <button type="submit">Update Quest</button>
      </form>
    </div>
  );
}

export default EditPost;