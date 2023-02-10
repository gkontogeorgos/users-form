import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { Input, Button } from "antd";
import { updateUser } from "common/services/endpoints";

const UsersForm = ({ user, setError }) => {
  const [isCancelButtonVisible, setIsCancelButtonVisible] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [isPending, setIsPending] = useState({});

  const {
    isValid,
    values,
    touched,
    errors,
    getFieldProps,
    setFieldValue,
    validateForm,
    setTouched,
  } = useFormikContext();

  useEffect(() => {
    if (typeof user?.name === "string") setFieldValue("name", user.name);
    if (typeof user?.email === "string") setFieldValue("email", user.email);
    if (typeof user?.phone === "string") setFieldValue("phone", user.phone);
    if (typeof user?.address === "string")
      setFieldValue("address", user.address);
    if (typeof user?.company === "string")
      setFieldValue("company", user.company);

    return () => {
      setDefaultValues();
    };
  }, [user]);

  useEffect(() => {
    validateForm();
  }, [values]);

  useEffect(() => {
    if (
      touched?.name ||
      touched?.email ||
      touched?.phone ||
      touched?.address ||
      touched?.company
    ) {
      if (!isValid) setIsSaveButtonDisabled(true);
      if (isValid) setIsSaveButtonDisabled(false);
      setIsCancelButtonVisible(true);
    }
  }, [touched, isValid, values]);

  const onSaveForm = (values) => {
    setIsPending({ updateUser: true });

    const payload = {
      name: values.name || user?.name || "",
      email: values.email || user?.email || "",
      phone: values.phone || user?.phone || "",
      address: values.address || user?.address || "",
      company: values.company || user?.company || "",
    };
    updateUser(user.id, payload)
      .then((resp) => {
        console.log("User's info successfully updated:", resp?.data);
        setIsSaveButtonDisabled(true);
        setIsCancelButtonVisible(false);
        setError(null);
        alert("User's info successfully updated!");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsPending({ updateUser: false });
      });
  };

  const onCancelForm = () => {
    setIsCancelButtonVisible(false);
    setIsSaveButtonDisabled(true);
    setTouched({});
    setDefaultValues();
  };

  const setDefaultValues = () => {
    if (!!user) {
      setFieldValue("name", user.name);
      setFieldValue("email", user.email);
      setFieldValue("phone", user.phone);
      setFieldValue("address", user.address);
      setFieldValue("company", user.company);
    }
  };

  return (
    <>
      <div className="users-form-field">
        <span className="label users-form-field-label">Name</span>
        <Input
          {...getFieldProps("name")}
          label="Name"
          variant="outlined"
          placeholder="Enter name"
          className={touched?.name && errors?.name ? "input-error" : "input"}
        />
        <div className="error">
          {touched?.name && errors?.name && <> {errors?.name} </>}
        </div>
      </div>
      <div className="users-form-field">
        <span className="label users-form-field-label">Email address</span>
        <Input
          {...getFieldProps("email")}
          label="Email"
          variant="outlined"
          placeholder="Enter email"
          className={touched?.email && errors?.email ? "input-error" : "input"}
        />
        <div className="error">
          {touched?.email && errors?.email && <> {errors?.email} </>}
        </div>
      </div>
      <div className="users-form-field">
        <span className="label users-form-field-label">Phone</span>
        <Input
          {...getFieldProps("phone")}
          label="Phone"
          variant="outlined"
          placeholder="Enter phone"
          className={touched?.phone && errors?.phone ? "input-error" : "input"}
        />
        <div className="error">
          {touched?.phone && errors?.phone && <> {errors?.phone} </>}
        </div>
      </div>
      <div className="users-form-field">
        <span className="label users-form-field-label">Address</span>
        <Input
          {...getFieldProps("address")}
          label="Address"
          variant="outlined"
          placeholder="Enter address"
          className={
            touched?.address && errors?.address ? "input-error" : "input"
          }
        />
        <div className="error">
          {touched?.address && errors?.address && <> {errors?.address} </>}
        </div>
      </div>
      <div className="users-form-field">
        <span className="label users-form-field-label">Company</span>
        <Input
          {...getFieldProps("company")}
          label="Company"
          variant="outlined"
          placeholder="Enter company"
          className={
            touched?.company && errors?.company ? "input-error" : "input"
          }
        />
        <div className="error">
          {touched?.company && errors?.company && <> {errors?.company} </>}
        </div>
      </div>
      <div className="buttons">
        {isCancelButtonVisible && (
          <Button className="cancel-button" onClick={onCancelForm}>
            <span className="cancel-button-text">Cancel</span>
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSaveButtonDisabled}
          className="save-button"
          loading={isPending?.updateUser}
          onClick={() => onSaveForm(values)}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default UsersForm;
