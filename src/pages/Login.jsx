import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import { Link ,Navigate} from 'react-router-dom';
const LOGIN_URL = 'http://localhost/simple_app_api.php';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let loginData = new FormData();
        loginData.append("email_login",email)
        loginData.append("password",password)

        try {
            const response = await axios.post(LOGIN_URL,loginData);
            console.log(loginData.password)
            console.log(response)
            setAuth({ email, password});
            setEmail('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
              <Navigate to="/home" />
            
          ) : (
                <div className='container-fluid m-3'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "d-none"}>{errMsg}</p>

                    <h1 className='text-center'>Sign In</h1>
                    {/****************************Login Email Part ********************************/}
                    <form onSubmit={handleSubmit}>
                      <div className='m-3'>
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            ref={userRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                      </div>
                    {/****************************Login Password Part ********************************/}
                        <div className='m-3'>
                          <label htmlFor="password" className="form-label">Password:</label>
                          <input
                              type="password"
                              id="password"
                              className="form-control"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                              required
                          />
                        </div>
                        <button className='btn btn-primary m-3'>Sign In</button>
                    </form>
                    <p className='m-3'>
                        Need an Account?
                        <Link to="/register"> Sign Up Now!</Link>
                    </p>
                </div>
            )}
        </>
    )
}

export default Login