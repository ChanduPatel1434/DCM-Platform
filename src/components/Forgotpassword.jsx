import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "../Services/authService"; // adjust path

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
 
  // RTK Query mutation hook
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const startCountdown = () => {
    setIsButtonDisabled(true);
    let timeLeft = 60;
    setCountdown(timeLeft);
    
    // Start countdown timer
    const countdownInterval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        setIsButtonDisabled(false);
      }
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await forgotPassword(email).unwrap().then(data => {
        // Show success toast for green messages
        if (data.message.includes("sent") || data.message.includes("If that email exists")) {
          toast.success(data.message);
          // Start countdown only when email is successfully sent
          startCountdown();
          // Clear the input field
          setEmail("");
        } 
        // Show error toast for red messages
        else if (data.message.includes("not found") || data.message.includes("not registered")) {
          toast.error(data.message);
          // Don't start countdown for error messages
        }
        // Default to success for other messages
        else {
          toast.success(data.message);
          // Start countdown for other success messages
          startCountdown();
          // Clear the input field
          setEmail("");
        }
      });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset link");
      // Don't start countdown for error responses
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
                style={{ backgroundImage: "url(img/slider-img-2.jpg)" }}
              >
                <div className="position-absolute login-signup-content">
                  <div className="position-relative text-white col-md-12 col-lg-7">
                    <h2 className="text-white">
                      Don't Worry You Can Reset Password? <br />
                    </h2>
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
                <h1 className="text-center mb-1">Password Reset</h1>

                {/* Subheading */}
                <p className="text-muted text-center mb-5">
                  Enter your email to get a password reset link.
                </p>

                {/* Form */}
                <form className="login-signup-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="input-group input-group-merge">
                      <div className="input-icon">
                        <span className="ti-email color-primary"></span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@address.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-block secondary-solid-btn border-radius mt-4 mb-3"
                    disabled={isLoading || isButtonDisabled}
                  >
                    {isLoading 
                      ? "Sending..." 
                      : isButtonDisabled 
                        ? `Resend in ${countdown}s` 
                        : "Reset Password"}
                  </button>

                  {/* Link */}
                  <div className="text-center">
                    <small className="text-muted text-center">
                      Remember your password?{" "}
                      <a href="/login">Log in</a>.
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

export default ForgotPassword;