import React, { useState } from "react";
import Users from "./app/compoments/users";
import SearchStatus from "./app/compoments/searchStatus";
import api from "./app/api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
    console.log(id);
  };
  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
        users={users}
      />
    </div>
  );
}

export default App;
