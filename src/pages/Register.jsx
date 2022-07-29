import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import axios from 'axios'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!*@#$%]).{4,24}$/;
const REGISTER_URL = 'http://localhost/simple_app_api.php';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(email.includes("@"));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = email.includes("@");
        const v2 = PWD_REGEX.test(password);

        let regData = new FormData();
        regData.append("email_reg",email)
        regData.append("password",password)

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,regData);
            console.log(response)
            if (response?.request.response.includes("Duplicate entry")) {
                setErrMsg('Email Reistered')
                errRef.current.focus();
                return
            }
            setSuccess(true);
            //clear state and input
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            setErrMsg('Registration Failed')
            console.log(err)
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <div>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            ) : (
                <div className="container-fluid m-3">
                    <p ref={errRef} className={errMsg ? "d-flex" : "d.none"}>{errMsg}</p>

                    <h1 className="text-center">Register Page</h1>

                    <form onSubmit={handleSubmit}>
                        {/*============================================Username part ================================================*/}
                        <div className="m-3">
                            <label htmlFor="email">
                                Username:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "text-success ps-2" : "d-none"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "d-none" : "text-danger ps-2"} />
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="form-control"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && email && !validEmail ? "d-flex" : "d-none"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Please enter vail email must include @
                            </p>
                        </div>

                        {/*============================================Password part ================================================*/}
                        <div className="m-3">
                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-success ps-2" : "d-none"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "d-none" : "text-danger ps-2"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                onChange={(e) => setPwd(e.target.value)}
                                value={password}
                                required
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "d-flex" : "d-none"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must include letters, a number and a special character.<br />
                                Allowed special characters: !@#$%*
                            </p>
                        </div>
                         {/*============================================Confirm Password part ================================================*/}
                        <div className="m-3">
                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "text-success ps-2" : "d-none"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "d-none" : "text-danger ps-2"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                className="form-control"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "d-flex" : "d-none"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                        </div>
                        <div className="m-3">
                            <button 
                                disabled={!validEmail || !validPwd || !validMatch ? true : false}
                                className="btn btn-info mt-2 mb-3"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="m-3">
                        Already registered?
                            <Link to="/login">
                                Sign In
                            </Link>
                    </p>
                </div>
            )}
        </>
    )
}

export default Register