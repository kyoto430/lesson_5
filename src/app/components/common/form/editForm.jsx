import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import TextField from "./textField";
import SelectField from "./selectField";
import RadioField from "./radioField";
import MultiSelectField from "./multiSelectField";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router";

const EditForm = ({ user }) => {
    const history = useHistory();
    const [data, setData] = useState({
        name: user.name,
        email: user.email || "",
        profession: user.profession._id,
        sex: user.sex || "male",
        qualities: user.qualities.map((quality) => ({
            value: quality._id,
            label: quality.name
        }))
    });

    const [qualities, setQualities] = useState();
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязателено для заполнения"
            },
            min: {
                message: "Имя должно содержать не менее 3 символов",
                value: 3
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        profession: {
            isRequired: {
                message: "Пoле выбора профессии обязателено для заполнения"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const [profession] = professions.filter(
            (profession) => profession._id === data.profession
        );
        const qualityIds = data.qualities.map((quality) => quality.value);
        const updatedQualities = Object.values(qualities).filter((quality) =>
            qualityIds.includes(quality._id)
        );
        const updatedData = {
            ...data,
            profession,
            qualities: updatedQualities
        };
        api.users.update(user._id, updatedData);

        history.goBack();
    };

    return (
        <div className="container">
            <h1>Редактировать</h1>
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
                    onChange={handleChange}
                    options={professions}
                    defaultOption="Choose..."
                    error={errors.profession}
                    value={data.profession}
                    label="Выбери свою профессию"
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
                    name="qualities"
                    label="Выберите качества"
                    defaultOption="Выбрать..."
                    defaultValue={data.qualities}
                    options={qualities}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary w-100 mx-auto"
                    disabled={!isValid || !professions}
                >
                    Обновить
                </button>
            </form>
        </div>
    );
};

EditForm.propTypes = {
    user: PropTypes.object
};

export default EditForm;
