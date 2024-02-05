import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  RegisterForm,
  RegisterSection,
  PasswordField,
} from "../components/StyledComponents.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LOGIN_URL = "/auth"; // login endpoint

function Login() {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the form from reloading

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // using cookies for authentication
        }
      );

      console.log(JSON.stringify(response?.data)); // "?." is for optional chaining which is for checking null/undefined before assignment
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400)
        setErrMsg("Missing username or password");
      else if (err.response?.status === 401)
        setErrMsg("Unauthorized or invalid username/password ");
      else setErrMsg("Login Failed");
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <RegisterSection>
          <h1>Success!</h1>
          <p>
            <a href="#">Welcome</a> 
          </p>
        </RegisterSection>
      ) : (
        <RegisterSection>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <RegisterForm onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="on"
              onChange={(e) => setUser(e.target.value)}
              required
              value={user}
            />
            <label htmlFor="password">Password:</label>
            <PasswordField>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                value={pwd}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </PasswordField>
            <button>Sign In</button>
          </RegisterForm>
          <p>
            Need an account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </RegisterSection>
      )}
    </>
  );
}

export default Login;
