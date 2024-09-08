import { useState, useEffect } from 'react';
import { manageUserType } from './checkUserType';

const useUserType = () => {
  const [userType, setUserType] = useState('Unknown User Type');
  
  useEffect(() => {
    const fetchUserType = async () => {
      const type = await manageUserType(); 
      setUserType(type);
    };
    fetchUserType();
  }, []);

  return userType;
};

export default useUserType;