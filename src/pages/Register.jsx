import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faInfoCircle,
  faCheck,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  RegisterForm,
  RegisterSection,
  PasswordField,
} from "../components/StyledComponents.jsx";

const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const registerURL = "/register";

function Register() {
  const userRef = useRef();
  const errRef = useRef(); // for announcing error

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState(""); // useState hooks for form fields
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showMatchPassword, setShowMatchPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus(); // set the focus to userName when the Form component loads
  }, []);

  useEffect(() => {
    setValidName(usernameRegex.test(user)); // boolean check
  }, [user]);

  useEffect(() => {
    setValidPwd(passwordRegex.test(pwd));
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  const togglePasswordVisibility = () => {
    // for toggling the password visibility
    setShowPassword(!showPassword);
  };

  const toggleMatchPasswordVisibility = () => {
    setShowMatchPassword(!showMatchPassword);
  };

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]); // for cleaning out the error message when the input fields change

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = usernameRegex.test(user); // in case the button is enabled with js hack
    const v2 = passwordRegex.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid entry");
      return;
    }
    try {
      const response = await axios.post(
        registerURL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) setErrMsg("Username Taken");
      else setErrMsg("Registration Failed");

      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <RegisterSection>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
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
          <h1>Register</h1>
          <RegisterForm onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <fontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <fontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="on"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <fontAwesomeIcon icon={faInfoCircle} />
              4 to 20 characters. <br />
              Alphanumeric characters and underscores allowed.
            </p>
            <label htmlFor="password">
              Password:
              <span className={validName ? "valid" : "hide"}>
                <fontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <fontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <PasswordField>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <fontAwesomeIcon icon={faInfoCircle} />
                At least 8 characters. <br />
                At least one digit and one uppercase character.
              </p>
            </PasswordField>
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && (matchPwd ? "valid" : "hide")}>
                <fontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <fontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <PasswordField>
              <input
                type={showPassword ? "text" : "password"}
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <button type="button" onClick={toggleMatchPasswordVisibility}>
                <FontAwesomeIcon
                  icon={showMatchPassword ? faEyeSlash : faEye}
                />
              </button>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <fontAwesomeIcon icon={faInfoCircle} />
                Passwords must match.
              </p>
            </PasswordField>
            <button
              disabled={
                !validName || !validPwd || !validMatch ? "true" : "false"
              }
            >
              Sign Up
            </button>
          </RegisterForm>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </RegisterSection>
      )}
    </>
  );
}

export default Register;
