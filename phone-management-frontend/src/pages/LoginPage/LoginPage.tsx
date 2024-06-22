import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useUserService } from "features/user/hooks";
import { ToastContainer } from "react-toastify";

interface FormData {
  username: string;
  password: string;
}

function LoginPage() {
  const { loginUser } = useUserService();
  const [data, setData] = useState<FormData>({ username: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [errors, setErrors] = useState<FormData>();
  const validateForm = (): boolean => {
    let formErrors: FormData = { username: "", password: "" };
    let isValid = true;
    if (!data?.username?.trim()) {
      formErrors.username = "Email is required";
      isValid = false;
    }
    if (!data?.password?.trim()) {
      formErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      loginUser(data);
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
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
      <div className="row vh-100 g-0">
        <div className="col-lg-6 position-relative d-none d-lg-block">
          <div
            className="bg-holder"
            style={{ backgroundImage: "url(images/bg.jpg)" }}
          ></div>
        </div>
        <div className="col-lg-6">
          <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
            <div className="col col-sm-11 col-lg-9 col-xl-7">
              <div className="text-center mb-5">
                <h3 className="fw-bold">Roundesk Technologies</h3>
                <h6 >Bienvenue chez notre Start-UP</h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">

                  <input
                    type="text"
                    className="form-control form-control-lg fs-6"
                    placeholder="Email"
                    name="username"
                    value={data?.username}
                    onChange={handleChange}
                  />
                  <span className="input-group-text">
                    <i className='bx bx-envelope' ></i>
                  </span>
                  {errors?.username && (
                    <div className="text-danger w-100">{errors.username}</div>
                  )}
                </div>
                <div className="input-group mb-3">

                  <input
                    type="password"
                    className="form-control form-control-lg fs-6"
                    placeholder="Password"
                    name="password"
                    value={data?.password}
                    onChange={handleChange}
                  />
                  <span className="input-group-text">
                    <i className="bx bx-lock-alt"></i>
                  </span>
                  {errors?.password && (
                    <div className="text-danger w-100">{errors.password}</div>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <div >
                    <input type="checkbox" id="passoublier" name="passoublier" value="true" />
                    <label > Mot de passe oublié ?</label>

                  </div>
                  <button
                    type="submit"
                    className="btn btn-success-roundesk   mb-3"
                  >
                    Connexion
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
