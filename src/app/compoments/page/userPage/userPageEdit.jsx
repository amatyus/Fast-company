import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import PropTypes from "prop-types";
import api from "../../../api";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";

const prepareDataToForm = (data) => ({
  ...data,
  profession: data.profession._id,
  qualities: data.qualities.map((quality) => ({
    color: quality.color,
    label: quality.name,
    value: quality._id
  }))
});

const transformProfessionsToSend = (professions, id) => {
  const profession = professions.find((profession) => profession.value === id);
  return { _id: professions.value, name: profession.label };
};

const transformDataToSend = (data, professions) => ({
  ...data,
  profession: transformProfessionsToSend(professions, data.profession),
  qualities: data.qualities.map((quality) => ({
    color: quality.color,
    name: quality.label,
    _id: quality.value
  }))
});

const UserPageEdit = ({ userId }) => {
  const [userData, setUserData] = useState();
  const [qualities, setQualities] = useState([]);
  const [professions, setProfession] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      const newFormData = prepareDataToForm(data);
      setUserData(newFormData);
    });

    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleChange = (target) => {
    setUserData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleShowAllUsers = () => {
    history.push(`/users/${userId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDataToSend = transformDataToSend(userData, professions);
    console.log(userDataToSend);

    api.users
      .update(userDataToSend._id, userDataToSend)
      .then(() => history.push(`/users/${userId}`));
  };

  if (!userData) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={handleShowAllUsers}>
          Назад
        </button>

        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />

              <TextField
                label="Электронная почта"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />

              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                onChange={handleChange}
                value={userData.profession}
              />

              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={userData.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />

              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={userData.qualities}
                name="qualities"
                label="Выберите ваши качества"
              />

              <button type="submit" className="btn btn-primary w-100 mx-auto">
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
