import React, { useEffect } from "react";
import CommentsList from "../common/comments/commentsList";
import { orderBy } from "lodash";
import AddComment from "../common/comments/addComment";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createComments,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from "../../store/comments";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleDeleteComment = (id) => {
    dispatch(removeComment(id));
  };

  const handleSubmit = (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId
    };
    dispatch(createComments(comment));
  };

  const sortComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddComment onSubmit={handleSubmit} />
        </div>
      </div>
      {comments?.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortComments}
                onDelete={handleDeleteComment}
              />
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
