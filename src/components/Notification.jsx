import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [message, setMessage] = useState("");

    const showNotification = (msg) => {
        setMessage(msg);
    };

    return (
        <NotificationContext.Provider value={{ message, setMessage, showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => useContext(NotificationContext);
