import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const UserPageEdit = ({ userId }) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);
  const { currentUser, updateUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });

  const history = useHistory();

  const { professions, isLoading: isLoadingProf } = useProfessions();
  const { qualities, getQuality, isLoading: isLoadingQual } = useQualities();

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));

  const qualitiesList = qualities.map((q) => ({
    value: q._id,
    label: q.name,
    color: q.color
  }));

  useEffect(() => {
    if (currentUser._id !== userId) {
      history.push(`/users/${userId}/edit`);
    }
    if (!isLoadingProf && !isLoadingQual) {
      setData({
        ...currentUser,
        qualities: currentUser.qualities
          .map((q) => getQuality(q))
          .map((q) => ({
            value: q._id.toString(),
            label: q.name,
            color: q.color
          }))
      });
    }
  }, [isLoadingQual, user]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта должна быть заполнена"
      }
    },
    name: {
      isRequired: {
        message: "Имя не должно быть пустым"
      }
    },
    professions: {
      isRequired: {
        message: "Профессия не должна быть пустой"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    setEnterError(null);
  };

  const handleShowUsers = () => {
    history.push(`/users/${userId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    console.log(newData);

    try {
      await updateUser(newData);
      handleShowUsers();
    } catch (error) {
      setEnterError(error.message);
    }
  };

  if (!user) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={handleShowUsers}>
          Назад
        </button>

        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />

              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />

              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professionsList}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />

              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />

              <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
              />
              {enterError && <p className="text-danger">{enterError}</p>}

              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

UserPageEdit.propTypes = {
  userId: PropTypes.string.isRequired
};
export default UserPageEdit;
