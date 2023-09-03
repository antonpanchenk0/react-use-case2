import React, {useEffect, useState} from 'react';
import validator from 'validator';
import {useDispatch} from 'react-redux';
import { addRecordAction } from '../../redux/actions/recordActions';
import './Form.css';

const Form = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [formValidationErrors, setFormValidationErrors] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);

  const validate = (data) => {
    const errors = {};
    if (validator.isEmpty(data.firstName)) {
      errors.firstName = 'First name is required';
    }

    if (validator.isEmpty(data.lastName)) {
      errors.lastName = 'Last name is required';
    }

    if (!validator.isEmail(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (!data.message || data.message?.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    return errors;
  };

  useEffect(() => {
    if (isFormDirty) {
      const errors = validate(formData);

      setFormValidationErrors(errors);
    }
  }, [formData, isFormDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    setIsFormDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);

    if (Object.keys(errors).length > 0) {
      setFormValidationErrors(errors);

      window.alert('Form is invalid.');
    } else {
      dispatch(addRecordAction(formData));

      setIsFormDirty(false);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });

      setFormValidationErrors({});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-wrapper">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formValidationErrors.firstName && <span className="error-container">{formValidationErrors.firstName}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formValidationErrors.lastName && <span className="error-container">{formValidationErrors.lastName}</span>}
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {formValidationErrors.email && <span className="error-container">{formValidationErrors.email}</span>}
        </div>

        <div className="input-wrapper">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
          {formValidationErrors.message && <span className="error-container">{formValidationErrors.message}</span>}
        </div>

        <button
          type="submit"
          disabled={Object.keys(formValidationErrors).length > 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
