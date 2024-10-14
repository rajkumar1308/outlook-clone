
import React, { useEffect, useState } from 'react';

const Emailbodyprev = ({ id, selectedCardDetails }) => {
  const [emailBody, setEmailBody] = useState("");

  useEffect(() => {
    const getEmailDetails = async () => {
      const response = await fetch(`https://flipkart-email-mock.vercel.app/?id=${id}`);
      const detailedResponse = await response.json();
      setEmailBody(detailedResponse?.body);
    };
    
    // Fetch email details only if `id` is available
    if (id) {
      getEmailDetails();
    }
  }, [id]);

  if (!selectedCardDetails) return null; // Return null if no details are passed

  const { subject, from, date } = selectedCardDetails;

  return (
    <div className='parent-body'>
      <div className='left-head-2'>
        <div className='circle'>{from.name.charAt(0).toUpperCase()}</div>
      </div>

      <div className="email-body">
        <h2>{subject}</h2>
        <p className="date">
          {new Date(date).toLocaleString()}
        </p>

        <div>
          {emailBody ? (
            <div dangerouslySetInnerHTML={{ __html: emailBody }} />
          ) : (
            <p>Loading email content...</p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Emailbodyprev;
