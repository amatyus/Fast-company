import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../compoments/page/userPage";
import UsersListPage from "../compoments/page/usersListPage";
import UserPageEdit from "../compoments/page/userPage/userPageEdit";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <UserPageEdit userId={userId} />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
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
