import { useState , useRef , useContext} from "react";
import AuthContext from "../../store/AuthContext";
import "../../style/LoginPage.css";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage=()=>{

    // const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const [enteredEmail, setEnteredEmail] = useState("");

    const Authcnt  = useContext(AuthContext);
    const [isLogin , setLogin] = useState(true);
    const navigate = useNavigate();

    const switchAuthModeHandler = () => {
        setLogin((preState) => !preState);
    };
    
    const submitEmail = (event) => {
        event.preventDefault();
        // const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (!isLogin) {
            const enteredConfirmPassword = confirmPasswordInputRef.current.value;
            if (enteredPassword !== enteredConfirmPassword) {
                alert("Passwords do not match!");
                return;
            }
        }

        const url = isLogin
            ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGJWPo3rA_BoZdiRHAWGnLbtiSQeaNJYA"
            : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGJWPo3rA_BoZdiRHAWGnLbtiSQeaNJYA";

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
            }),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.json().then((data) => {
                if (res.ok) {
                    Authcnt.login(data.idToken,enteredEmail);
                    alert("Authentication Successful");
                    console.log(data);
                    navigate("/profilepage");
                } 
                else {
                    let errorMessage = "Authentication failed!";
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                }
            });
        })
        .then(() => {
            setEnteredEmail("");
            passwordInputRef.current.value = "";
            confirmPasswordInputRef.current.value='';
        })
        .catch((err) => {
            alert(err.message);
            setEnteredEmail("");
            passwordInputRef.current.value = "";
            confirmPasswordInputRef.current.value="";
        });


    };


    return(
        <>
            <br></br><br></br>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <h3>This is login page</h3>
            <form onSubmit={submitEmail}>
                <div className="text-container">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required value={enteredEmail} onChange={(e) => setEnteredEmail(e.target.value)} />
                    <br></br><br></br>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" required ref={passwordInputRef} />
                    <br></br><br></br>
                    {!isLogin &&(    
                        <>             
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input type="password" id="cnf-password" required ref={confirmPasswordInputRef} />
                        </>

                    )};
                </div>

                <div className="button-container">
                    <button>{isLogin ? "Login" : "Create Account"}</button><br></br><br></br>
                    <button type="button" onClick={switchAuthModeHandler}>{isLogin ? "Create new account" : "Login "}</button>
                </div>
                
                <div className="forgot-password">
                    {enteredEmail.trim() !== "" 
                    ? (<Link to="/forgot-password">Forgot Password?</Link>) 
                    : (<span className="disabled-link">Forgot Password?</span>)}
                </div>
            
            </form>
        </>
    );
}

export default LoginPage;