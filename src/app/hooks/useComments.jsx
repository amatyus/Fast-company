import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    // setComments(null);
    // setLoading(false);
    getComments();
  }, [userId]);

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComment(userId);
      setComments(content);
    } catch (error) {
      errorCatcher();
    } finally {
      setLoading(false);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function removeComment(id) {
    try {
      const { contetnt } = await commentService.removeComment(id);
      if (contetnt === undefined) {
        setComments((prevState) => prevState.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher();
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <CommentsContext.Provider
      value={{ isLoading, comments, createComment, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
