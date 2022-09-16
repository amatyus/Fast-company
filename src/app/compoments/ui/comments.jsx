import React, { useEffect, useState } from "react";
import api from "../../api";
import CommentsList from "../common/comments/commentsList";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import AddComment from "../common/comments/addComment";

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState();

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleDeleteComment = (id) => {
    api.comments.remove(id).then((id) => {
      setComments(comments.filter((x) => x._id !== id));
    });
  };

  const handleAddComment = (data) => {
    const newComment = {
      pageId: userId,
      userId: data.userId,
      content: data.comment
    };
    return api.comments.add(newComment).then((data) => {
      setComments([...comments, data]);
    });
  };

  const sortComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddComment onSubmit={handleAddComment} />
        </div>
      </div>
      {comments?.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />

            <CommentsList
              comments={sortComments}
              onDelete={handleDeleteComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
