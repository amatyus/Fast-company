import React from "react";

const BookMark = ({ status, onClick }) => {
  const bookMarkIcon = status ? (
    <i className="bi bi-bookmark-fill" />
  ) : (
    <i className="bi bi-bookmark" />
  );

  return <button onClick={onClick}>{bookMarkIcon}</button>;
};

export default BookMark;
