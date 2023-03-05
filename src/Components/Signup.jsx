import React, { useState, useEffect } from 'react';
// import '../Styles/Login.css';
import styles from '../Styles/Login.module.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth';
import db, { auth } from '../firebase';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Signup = () => {
    { document.body.style.backgroundColor = 'var(--primaryDarkColor)' }
    // React Hooks
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        uid: ""
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { username, email, password, uid } = formData;
    const navigate = useNavigate();
    var errorFlag = false;

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formData);
        }
    }, [formErrors]);

    const errors = {};
    const validate = (values) => {
        const regex = /^[^\s@]+@[^\s@]+\. [^\s@]{2,}$/i;
        errorFlag = false;
        if (!values.username) {
            errors.username = "Username is required!";
            errorFlag = true;
        }
        if (!values.email) {
            errors.email = "Email is required!";
            errorFlag = true;
        }
        if (!values.password) {
            errors.password = "Password is required!";
            errorFlag = true;
        } else if (values.password.length < 8) {
            errors.password = "Password must be atleast of 8 characters!";
            errorFlag = true;
        }
        return errors;
    }
    // Functions
    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    async function signup(e) {
        e.preventDefault();
        try {
            setFormErrors(validate(formData));

            if (!errorFlag) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                updateProfile(auth.currentUser, { displayName: username });
                const user = userCredential.user;
                const formDataCopy = { ...formData };
                delete formDataCopy.password;
                formDataCopy.timestamp = serverTimestamp();
                await setDoc(doc(db, "users", userCredential.user.uid),
                    {
                        uid: userCredential.user.uid,
                        displayName:username,
                        email
                    }, formDataCopy);

                //for individual chat record we create userChat
                await setDoc(doc(db, "userChats", user.uid), {});
                navigate("/chatPage");

                toast.success('Signed up successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/home');

            }
        } catch (error) {
            if (!errorFlag) {
                if (error.code === "auth/email-already-in-use") {
                    toast.error("Email address is already in use")
                } else if (error.code === "auth/invalid-email") {
                    toast.error("Email address is not valid")
                } else if (error.code === "auth/operation-not-allowed") {
                    toast.error("Operation not allowed")
                } else if (error.code === "auth/weak-password") {
                    toast.error("Password is too weak")
                } else {
                    toast.error(`${error.message}`)
                }
            }
        }
    }

    async function continueWithGoogle(e) {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            toast.success('Signed up successfully!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/home');
        }
        catch (error) {
            console.log(error);
        }
    }





    // Return statement
    return (
        <div className={styles.signupContainer}>
            <form onSubmit={signup}>
                <div className={styles.loginForm}>
                    <h4 className={styles.form_header}>Welcome!</h4>
                    <div>
                        <div className={styles.row}>
                            <input type="text" id="username" placeholder="Username" value={username} onChange={onChange} />
                        </div>
                        <p className={styles.print_error}>{formErrors.username}</p>
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
                        <div id={styles.button} className={styles.row} style={{ marginLeft: '0%' }}>
                            <button>Sign up</button>
                        </div>
                    </div>
                    <div className={styles.already}>
                        Already have an account?&nbsp;
                        <Link to="/log-in" style={{ textDecoration: 'none' }}>Login</Link>
                    </div>

                    <p className={styles.hr_lines}> OR </p>
                    <div className={styles.alternate_login}>
                        <button type="button" onClick={continueWithGoogle} className={styles.continue}> <a href='https://www.google.co.in/'>
                            <FcGoogle id={styles.googleIcon} />
                        </a> Continue with Google</button>
                    </div>
                </div>
                <Outlet />
            </form>
        </div>
    )
}

export default Signup