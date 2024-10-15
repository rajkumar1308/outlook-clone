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


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = users.slice(firstPostIndex, lastPostIndex);


  useEffect(() => {
    const fetchUsers = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.list) {
          setUsers(data.list);
        }
      } catch (e) {
        console.error(e);
      }
    };
  
    fetchUsers(API);
  }, []);


  const handleClickEvent = (user) => {
    setSelectedCardId(user.id)
    setSelectedCardDetails(user)
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
         
            <UserData users={currentPosts} handleClickEvent={handleClickEvent}  />

            <Pagination totalPosts={users.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
             ></Pagination>

          </div>
          <div className={`email-body ${selectedCardId ? 'expanded' : ''}`}>
            
            { <Emailbodyprev selectedCardDetails={selectedCardDetails} id={selectedCardId}/>}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
