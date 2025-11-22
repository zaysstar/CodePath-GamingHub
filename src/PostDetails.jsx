import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  deleteDoc, 
  updateDoc, 
  increment, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import './PostDetails.css'; // We will create this simple CSS file below

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const getYouTubeEmbed = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

  // 1. Fetch Post Data & Listen for Real-time Comments
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchPost();

    // Set up a real-time listener for comments (Sub-collection)
    // Path: posts -> [id] -> comments
    const commentsRef = collection(db, "posts", id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [id]);

  // 2. Handle Upvote (XP Boost)
  const handleUpvote = async () => {
    const postRef = doc(db, "posts", id);
    
    // Update Database
    await updateDoc(postRef, {
      upvotes: increment(1)
    });

    // Update UI instantly (Optimistic UI)
    setPost(prev => ({ ...prev, upvotes: prev.upvotes + 1 }));
  };

  // 3. Handle Delete Post
  const handleDelete = async () => {
    const secretInput = prompt("ENTER ADMIN KEY TO DELETE:");
    
    // Check against the key saved with the post, or a master key
    if (post.secretKey && secretInput === post.secretKey) {
      await deleteDoc(doc(db, "posts", id));
      navigate('/'); // Warp back to home
    } else {
      alert("❌ ACCESS DENIED: Wrong Key");
    }
  };

  // 4. Handle New Comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentsRef = collection(db, "posts", id, "comments");
    
    await addDoc(commentsRef, {
      text: newComment,
      createdAt: serverTimestamp()
    });

    setNewComment(""); // Clear input
  };

  if (loading) return <div className="loading-screen">Loading Level...</div>;
  if (!post) return <div className="error-screen">GAME OVER: Quest not found.</div>;

  return (
    <div className="post-details-container">
      
      {/* Top Action Bar */}
      <div className="action-bar">
        <Link to="/" className="back-btn">← Back to Hub</Link>
        <div className="admin-controls">
          <Link to={`/edit/${id}`} className="edit-btn">🔧 Mod Post</Link>
          <button onClick={handleDelete} className="delete-btn">🗑️ Destroy</button>
        </div>
      </div>

      {/* Main Quest Content */}
      <div className="main-post">
        <div className="post-header">
          <div className="vote-section">
            <button className="upvote-btn" onClick={handleUpvote}>
              ▲
            </button>
            <span className="xp-count">{post.upvotes || 0} XP</span>
          </div>
          <h1>{post.title}</h1>
        </div>

        {post.imageURL && (
          <div className="post-image-container">
            <img src={post.imageURL} alt="Quest Snapshot" className="post-image" />
          </div>
        )}

        {post.imageURL && (
  <div className="media-container">
    {getYouTubeEmbed(post.imageURL) ? (
      <iframe 
        width="100%" 
        height="400" 
        src={`https://www.youtube.com/embed/${getYouTubeEmbed(post.imageURL)}`} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    ) : (
      <img src={post.imageURL} alt="Quest Snapshot" className="post-image" />
    )}
  </div>
)}

        <p className="post-content">{post.content || post.description}</p>
      </div>

      {/* Comments Section (Chat Log) */}
      <div className="comments-section">
        <h3>💬 Global Chat ({comments.length})</h3>
        
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input 
            type="text" 
            placeholder="Enter chat message..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-bubble">
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;