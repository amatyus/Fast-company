import React from "react";
import CommentsList from "../common/comments/commentsList";
import { orderBy } from "lodash";
import AddComment from "../common/comments/addComment";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
  //   const { userId } = useParams();
  const { createComment, comments, removeComment } = useComments();

  //   useEffect(() => {
  //     api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  //   }, []);

  const handleDeleteComment = (id) => {
    removeComment(id);
    //   api.comments.remove(id).then((id) => {
    //     setComments(comments.filter((x) => x._id !== id));
    //   });
  };

  const handleSubmit = (data) => {
    createComment(data);
    // const newComment = {
    //   pageId: userId,
    //   userId: data.userId,
    //   content: data.comment
    // };
    // return api.comments.add(newComment).then((data) => {
    //   setComments([...comments, data]);
    // });
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
