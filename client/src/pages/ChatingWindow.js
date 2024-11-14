import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoom from './ChatRoom'; // Updated import statement

const ChatingWindow = () => {
  const { chatId } = useParams(); // Get chatId from URL parameters
// console.log('receiverId : ',chatId);

  return (
    <div>
      <ChatRoom chatId={chatId} /> {/* Updated component name */}
    </div>
  );
};

export default ChatingWindow;
