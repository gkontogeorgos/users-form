import React from "react";

const UserInfo = ({ user }) => {
  return (
    <>
      <div>
        <img src={user?.photo} alt="" className="selected-user-icon"></img>
      </div>
      <div className="grid-item">
        <span className="user-name">{user?.name}</span>
        <span className="label">{user?.email}</span>
      </div>
    </>
  );
};

export default UserInfo;
