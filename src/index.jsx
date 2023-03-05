import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Components/NewChat/context/AuthContext';

// import { AuthContextProvider } from '.NewChat/components/context/AuthContext';
import {ChatContextProvider} from './Components/NewChat/context/ChatContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <AuthContextProvider>
            <ChatContextProvider>
                <App />
            </ChatContextProvider>
        </AuthContextProvider>

    </>
);
