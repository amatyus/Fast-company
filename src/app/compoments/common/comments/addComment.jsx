import React, { useState, useEffect } from "react";
import SelectField from "../form/selectField";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";

import api from "../../../api";
import TextAreaField from "../form/textAreaField";

const initFormData = { userId: "", comment: "" };

const AddComment = ({ onSubmit }) => {
  const [data, setData] = useState(initFormData);
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState({});

  api.users.fetchAll().then((data) => {
    const usersList = Object.keys(data).map((user) => ({
      label: data[user].name,
      value: data[user]._id
    }));
    setUsers(usersList);
  });

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберете пользователя"
      }
    },
    comment: {
      isRequired: {
        message: "Заполните поле комментария"
      }
    }
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data).then((_) => {
      setData(initFormData);
    });
  };

  return (
    <>
      <h2>New comment</h2>

      <form onSubmit={handleSubmit}>
        <SelectField
          defaultOption="Choose..."
          options={users}
          name="userId"
          onChange={handleChange}
          value={data.userId}
          error={errors.userId}
        />
        <TextAreaField
          name="comment"
          value={data.comment}
          onChange={handleChange}
          error={errors.comment}
        />
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-primary ">
            Опубликовать
          </button>
        </div>
      </form>
    </>
  );
};

AddComment.propTypes = {
  onSubmit: PropTypes.func
};

export default AddComment;
