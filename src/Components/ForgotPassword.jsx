import React, {useState} from 'react';
import { FloatingLabel } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { BsArrowReturnLeft } from 'react-icons/bs';
import styles from '../Styles/Login.module.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    // React Hooks 
    const [email, setEmail] = useState("");


    // Functions
    async function sendEmail(e){
        // sends email when clicked
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.log(error);
        }
    }

    // Return statement
    return (
        <div className={styles.loginForm}>
            <h2 className={styles.form_header}>
                Forgot Password?
            </h2>
            <div className={styles.forgotPassword}>
                <FloatingLabel id={styles.forgot} controlId="floatingInput" label=" Enter your email" className="mb-3">
                    <Form.Control type="email" value={email} placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
            </div>

            <div className={styles.alternate_login} style={{paddingTop: '1px', paddingBottom: '30px'}}>
                <button type="button" onClick={sendEmail}className={styles.continue} style={{border: '2px solid rgb(145, 201, 220)'}}>
                    Send Email
                </button>
            </div>

            <div className={styles.backRedirect}>
                <Link to='/log-in'>Redirect to Login <BsArrowReturnLeft/></Link>
            </div>
        </div>
    )
}

export default ForgotPassword