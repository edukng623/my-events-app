import React, { useEffect, useState } from 'react';  
import { fetchUsers } from '../utils/api/users';  

const UsersList = () => {
  const [users, setUsers] = useState([]); 
  useEffect(() => { 
 

    async function fetchUsersData() {
      try { 
        const data = await fetchUsers( );
        let html = data;
        setUsers((prevUser) => html);
      } catch (error) {
        // Handle error
        console.log(error)
      }
    }

    fetchUsersData();
  }, [ ]);

   
  return ( 
    <div>
      <h1>Users Data</h1> 
      <div dangerouslySetInnerHTML={{ __html: users }} />
    </div>
  );
};

export default UsersList;
