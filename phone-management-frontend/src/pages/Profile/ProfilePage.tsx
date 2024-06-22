import { useUserService } from "features/user/hooks";
import { selectUser } from "features/user/store";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "store/hooks";
import { ToastContainer } from "react-toastify";
import "./Profile.css";

function ProfilePage() {
  const { getCurrentUser } = useUserService();
  const { user } = useAppSelector(selectUser);
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      getCurrentUser();
      didMountRef.current = true;
    }
  }, []);
  return (
    <div className="container-fluid vh-100">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="profile-card p-4">
            <h1 className="text-center mb-4">Welcome to profile</h1>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <p className="form-control-plaintext">{user?.username}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Profile:</label>
              <p className="form-control-plaintext">{user?.profile}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
