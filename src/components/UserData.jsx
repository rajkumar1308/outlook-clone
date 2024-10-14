const UserData = ({ users , handleClickEvent }) => {
   
    return (
      <>
        {users.length > 0 ? (
          users.map((curUser) => {
            const { id, from, date, subject, short_description } = curUser;
            return (
              <div
                className="parent-body"
                key={id}
                onClick={()=>{
                  handleClickEvent(curUser);
                }}
              >
                <div className="left-head">
                  <div className="circle">
                    {from.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="subject-body">
                  <p className="subject">From: {from.email}</p>
                  <p className="subject">Subject: {subject}</p>
                  <p className="short-description">{short_description}</p>
                  <p className="date">Date: {new Date(date).toLocaleString()}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No users found.</p>
        )}
      </>
    );
  };
  
  export default UserData;
