import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useResetPasswordMutation } from "../Services/authService"; // adjust path
import ErrorPage from "./ErrorPage"; // import your ErrorPage component

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token & email from URL query params
  const searchParams = new URLSearchParams(location.search);
  const rspd = searchParams.get("rspd");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Check if required parameters are missing
  if (!rspd || !email) {
    return <ErrorPage />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ email, rspd, newPassword }).unwrap();
      toast.success("Password changed successfully");
      
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="main">
      {/* Hero Section Start */}
      <section className="hero-section full-screen gray-light-bg">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            {/* Left Image Section */}
            <div className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
              <div
                className="bg-cover vh-100 ml-n3 gradient-overlay"
                style={{ backgroundImage: "url('img/slider-img-1.jpg')" }}
              >
                <div className="position-absolute login-signup-content">
                  <div className="position-relative text-white col-md-12 col-lg-7">
                    <h2 className="text-white">Change Your Password</h2>
                    <p>
                      Keep your face always toward the sunshine - and shadows will fall behind you.
                      Continually pursue fully researched niches whereas timely platforms.
                      Credibly parallel task optimal catalysts for change after focused catalysts for change.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="col-12 col-md-5 col-lg-6 col-xl-4 px-lg-6">
              <div className="login-signup-wrap px-4 px-lg-5 my-5">
                {/* Heading */}
                <h1 className="text-center mb-1">Change Password</h1>

                {/* Subheading */}
                <p className="text-muted text-center mb-5">Enter your new password</p>

                {/* Form */}
                <form className="login-signup-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="pb-1">New Password</label>
                    <div className="input-group input-group-merge">
                      <div className="input-icon">
                        <span className="ti-lock color-primary"></span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="pb-1">Confirm Password</label>
                    <div className="input-group input-group-merge">
                      <div className="input-icon">
                        <span className="ti-lock color-primary"></span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-block secondary-solid-btn border-radius mt-4 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </button>

                  {/* Link */}
                  <div className="text-center">
                    <small className="text-muted text-center">
                      Remember your password? <a href="/login">Log in</a>.
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}
    </div>
  );
};

export default ChangePassword;