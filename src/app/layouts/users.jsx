import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../compoments/page/userPage";
import UsersListPage from "../compoments/page/usersListPage";
import UserPageEdit from "../compoments/page/userPage/userPageEdit";
import UsersLoader from "../compoments/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <UserPageEdit userId={userId} />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  );
};

export default Users;
