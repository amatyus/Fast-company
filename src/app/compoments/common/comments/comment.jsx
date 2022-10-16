import React from "react";
import PropTypes from "prop-types";
import { getDateByTimestamp } from "../../../utils/date";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({
  comment,
  created_at: created,
  pageId,
  userId,
  _id,
  onDelete
}) => {
  const { getUserById } = useUser();
  const { currentUser } = useAuth();
  const user = getUserById(userId);
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     api.users.getById(userId).then((data) => setUser(data));
  //     setIsLoading(false);
  //   }, []);

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user && user.name}
                    <span className="small">
                      {" "}
                      - {getDateByTimestamp(created)}
                    </span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onDelete(_id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{comment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pageId: PropTypes.string,
  userId: PropTypes.string,
  _id: PropTypes.string,
  onDelete: PropTypes.func
};

export default Comment;
