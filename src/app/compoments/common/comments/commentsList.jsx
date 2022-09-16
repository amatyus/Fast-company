import React from "react";
import Comment from "./comment";

const CommentsList = ({ comments, onDelete }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} {...comment} onDelete={onDelete} />
  ));
};

export default CommentsList;
