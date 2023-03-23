import React from "react";
import { Link } from "react-router-dom";
const UserPanel = () => {
  return (
    <div className="class-2">
      <h4>User Panel</h4>
      <ul className="list-group">
        <Link
          to="/dashboard/user/edit-profile"
          className="list-group-item class-1"
        >
          Edit Profile
        </Link>{" "}
        <Link
          to="/dashboard/user/order-history"
          className="list-group-item class-1"
        >
          Order History
        </Link>
      </ul>
    </div>
  );
};

export default UserPanel;
