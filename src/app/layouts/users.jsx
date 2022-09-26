import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../compoments/page/userPage";
import UsersListPage from "../compoments/page/usersListPage";
import UserPageEdit from "../compoments/page/userPage/userPageEdit";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <UserPageEdit userId={userId} />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
