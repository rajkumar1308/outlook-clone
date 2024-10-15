import { useEffect, useState } from 'react';
import './App.css';
import Emailbodyprev from './components/Emailbodyprev';
import Pagination from './components/Pagination';
import UserData from './components/userdata';

const API = "https://flipkart-email-mock.now.sh/";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [filter, setFilter] = useState('all'); // New filter state

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  
  // Apply filter before slicing
  const filteredUsers = users.filter(user => {
    if (filter === 'unread') return !user.isRead;
    if (filter === 'read') return user.isRead;
    if (filter === 'favorites') return user.isFavorite;
    return true; // for 'all'
  });

  const currentPosts = filteredUsers.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const fetchUsers = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.list) {
          const initializedUsers = data.list.map(user => ({
            ...user,
            isRead: false, // Initialize to false for unread
            isFavorite: false // Initialize to false for favorites
          }));
          setUsers(initializedUsers);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchUsers(API);
  }, []);

  const handleClickEvent = (user) => {
    setSelectedCardId(user.id);
    setSelectedCardDetails(user);
    // Mark as read when selected
    if (!user.isRead) {
      setUsers(prevUsers => 
        prevUsers.map(u => u.id === user.id ? { ...u, isRead: true } : u)
      );
    }
  };

  const toggleFavorite = (userId) => {
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === userId ? { ...u, isFavorite: !u.isFavorite } : u)
    );
  };

  return (
    <>
      <section>
        <div className="header-body">
          <ul>
            <li>Filter By </li>
            <li onClick={() => setFilter('unread')}>Unread</li>
            <li onClick={() => setFilter('read')}>Read</li>
            <li onClick={() => setFilter('favorites')}>Favorites</li>
           
          </ul>
        </div>
        <div className="main-container">
          <div className={`email-list ${selectedCardId ? 'shrink' : ''}`}>
            <UserData 
              users={currentPosts} 
              handleClickEvent={handleClickEvent} 
          
            />

            <Pagination 
              totalPosts={filteredUsers.length} 
              postsPerPage={postsPerPage} 
              setCurrentPage={setCurrentPage} 
            />
          </div>
          <div className={`email-body ${selectedCardId ? 'expanded' : ''}`}>
            <Emailbodyprev selectedCardDetails={selectedCardDetails} id={selectedCardId}  toggleFavorite={toggleFavorite}  />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
