import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';

// This will check if the user accessing the portal is loggedIn and authenticated.
export const GetAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);  // changes only when the accessing user is authenticated
    const [checkingStatus, setCheckingStatus] = useState(true); // checks the progress of user authentication

    useEffect(() => {
        // sets the loggedIn variable to true if user is loggedIn
        onAuthStateChanged(auth, (user) => {
            if(user){
                setLoggedIn(true);
            }
            setCheckingStatus(false);       // stops checking for user authentication
        });
    }, []);
    
    return ({loggedIn, checkingStatus});
}