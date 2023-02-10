import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Card } from "@material-ui/core";
import { getAllUsers, getUser } from "common/services/endpoints";
import loading from "common/assets/images/loading.gif";
import UserInfo from "components/UserInfo/UserInfo";
import UsersForm from "components/UsersForm/UsersForm";
import { initialFormValues } from "./utils/utils";
import { userFormValidationSchema } from "./utils/utils";

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = React.useState({});
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    setIsPending({ getAllUsers: true });
    getAllUsers()
      .then((resp) => {
        setUsers(resp.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsPending({ getAllUsers: false });
      });
  }, []);

  const onSetUser = (user) => {
    setIsPending({ getUser: true });
    getUser(user?.id)
      .then((res) => {
        setSelectedUser(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsPending({ getUser: false });
      });
  };

  /* By default the first user is selected
  useEffect(() => {
    if (users?.length > 0) setSelectedUser(users[0]);
  }, [users]);
  */

  return (
    <div className="container">
      <Card className="card">
        <div className="col-6 full-height">
          {isPending?.getAllUsers && (
            <div className="loadingIcon">
              <img src={loading} alt=""></img>
            </div>
          )}
          {!isPending?.getAllUsers && users?.length > 0 && (
            <>
              {!selectedUser && (
                <span className="label select-user-label users-form users-form-field-label">
                  Select a user to edit
                </span>
              )}
              <div className="users-box">
                {users.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className={`col-12 user-item ${
                        selectedUser?.id === user.id && "selected-user"
                      }`}
                      onClick={() => onSetUser(user)}
                    >
                      <UserInfo user={user} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {!!error && <div className="error">{error}</div>}
        </div>
        <div className="col-6 full-height">
          {isPending?.getUser && (
            <div className="loadingIcon">
              <img src={loading} alt=""></img>
            </div>
          )}
          {!isPending?.getUser && !!selectedUser && (
            <Formik
              initialValues={initialFormValues}
              validationSchema={userFormValidationSchema}
              onSubmit={(isValid, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  if (isValid) {
                    alert("Form submitted!");
                  } else return;
                }, 400);
              }}
            >
              <form className="users-form mt-15">
                <UsersForm user={selectedUser} setError={setError} />
              </form>
            </Formik>
          )}
          {!!error && <div className="error">{error}</div>}
        </div>
      </Card>
    </div>
  );
};

export default UsersPanel;
