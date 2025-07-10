import { useRef, useContext , useState} from "react";
// import "./ForgotPassword.css";



const ForgotPasswordPage = () => {
  const emailInputRef = useRef();


  const submitHandler = async (e) => {
    e.preventDefault();
    const emailInput = emailInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDGJWPo3rA_BoZdiRHAWGnLbtiSQeaNJYA",
      {
        method: "POST",
        body: JSON.stringify({
            requestType:"PASSWORD_RESET" ,
            email: emailInput
        }),
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then(()=>{alert("password reset successful");})
    };

  return (
    <div className="forgot-container">
      <h2>Reset Password</h2>
      <form onSubmit={submitHandler}>
        <label>Enter your Registered Email</label>
        <br></br><br></br>
        <input type="email" ref={emailInputRef} required />
        <br></br><br></br>
        <button>send Reset Password Request</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
