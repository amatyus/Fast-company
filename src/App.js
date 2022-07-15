import React, { useState } from "react";
import Users from "./app/compoments/users";
import SearchStatus from "./app/compoments/searchStatus";
import api from "./app/api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const handleUserBookMark = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user._id === userId) {
          return { ...user, bookmark: !user.bookmark };
        }

        return user;
      })
    );
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        handleDelete={handleDelete}
        handleUserBookMark={handleUserBookMark}
      />
    </>
  );
}

export default App;
