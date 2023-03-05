import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import db, { auth } from '../firebase';
import styles from '../Styles/Login.module.css';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import logo from '../Images/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  // React Hooks
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isTrue, setIsTrue] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  { document.body.style.backgroundColor = 'var(--primaryDarkColor)' }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isTrue) {
      // console.log(formData);
    }
  }, [formErrors]);

  const { email, password } = formData;
  const navigate = useNavigate();
  var errorFlag = false;

  // Functions
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\. [^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
      errorFlag = true;
    }

    if (!values.password) {
      errors.password = "Password is required!";
      errorFlag = true;
    }
    else if (values.password.length < 8) {
      errors.password = "Password must be atleast of 8 characters";
      errorFlag = true;
    }
    return errors;
  }

  function onChange(e) {
    // setFormErrors((prevState) => ({
    //   ...prevState,
    //   [e.target.id]: "",
    // }));
    // appends the data to formData
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function login(e) {
    // if the user is present, performs login to home page
    e.preventDefault();
    try {
      setFormErrors(validate(formData));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user && !errorFlag) {
        navigate("/home");
      }
    } catch (error) {
      // console.log(error);
      // console.log(error.code);
      if(!errorFlag){
        if (error.code === "auth/user-not-found") {
          toast.error("User not Found! Sign up first")
        } else if (error.code === "auth/wrong-password") {
          toast.error("Wrong Email or Password")
        } else {
          toast.error(`${error.message}`)
        }
      }
    }
  }

  async function continueWithGoogle(e) {
    // if user clicks on continueWith google, it will redirect to google accounts login
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // enter user into firestore database
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/home');
    }
    catch (error) {
      console.log(error);
    }
  }


  // Return statement
  return (
    <>
      <form onSubmit={login}>
        <div className={styles.loginForm}>
          <h2 className={styles.form_header}>
            Welcome!
          </h2>
          <div className={styles.row}>
            <input type="email" id="email" placeholder="Email" value={email} onChange={onChange} />
          </div>
          <p className={styles.print_error}>{formErrors.email}</p>
          <div className={styles.row} style={{ position: 'relative' }}>
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" value={password} onChange={onChange} />
            {showPassword ?
              <AiFillEyeInvisible className={styles.eyeChange} onClick={() => setShowPassword(!showPassword)} />
              : <AiFillEye className={styles.eyeChange} onClick={() => setShowPassword(!showPassword)} />
            }
          </div>
          <p className={styles.print_error}>{formErrors.password}</p>
          <div className={styles.row_updated}>
            <Link to='/forgot-password' style={{ textDecoration: 'none' }}>Forgot Password?</Link>
          </div>
          <div id={styles.button} className={styles.row} style={{ marginLeft: '0%' }}>
            <button>Log in</button>
          </div>
          <div className={styles.donot}>
            Don't have an account?&nbsp;
            <Link to='/sign-up' style={{ textDecoration: 'none' }}>Signup</Link>
          </div>

          <p className={styles.hr_lines}> OR </p>
          <div className={styles.alternate_login}>
            <button type='button' onClick={continueWithGoogle} className={styles.continue}> <a href='#'>
              <FcGoogle id={styles.googleIcon} />
            </a> Continue with Google</button>
          </div>
        </div>
        <Outlet />
      </form>
    </>
  )
}

export default Login