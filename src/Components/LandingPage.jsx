import React from 'react';
import '../Styles/LandingPage.css';
import women from '../Images/women.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    {document.body.style.backgroundColor = 'white'}

    return (
        <div className="containerPage">
            <div className="left">
                <b><h1>Welcome to Our Community</h1></b>
                <h2>Your Community knows best</h2>
                <p> Get in touch with the people with the best tips. Share simchas<br />
                    and knowledge. Experience the power of Community. </p><br/>
                    <button><Link to="/log-in" className='start-btn'>Login</Link></button>
                    <button style={{marginLeft: '30px'}}><Link to="sign-up" className='start-btn'>Sign Up</Link></button>
            </div>
            <div className="right">
                <img className='photo' src={women} alt="" />
            </div>
        </div>        
    )
}

export default LandingPage