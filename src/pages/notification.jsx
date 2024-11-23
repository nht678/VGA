

import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

function Notification() {
    let token = localStorage.getItem('token');
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');

    const accessToken = token;  // Token JWT của bạn

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/notification_hub`, {
                accessTokenFactory: () => accessToken
            })
            .withAutomaticReconnect()
            .build();

        // Kết nối SignalR
        connection.start()
            .then(() => {
                setStatus('Connected to SignalR');
                console.log('Connected to SignalR hub.');

                // Nhận thông báo từ server
                connection.on('ReceiveNotification', (message) => {
                    console.log('Received notification:', message);
                    setMessages(prevMessages => [...prevMessages, message]);
                });
            })
            .catch(err => {
                setStatus(`Connection failed: ${err}`);
                console.error(err);
            });

        // Clean up khi component unmount
        return () => {
            connection.stop();
        };
    }, [accessToken]);

    return (
        <div className="App">
            <h1>SignalR Notifications</h1>
            <p>{status}</p>
            <div>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div key={index} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                            <p><strong>{message.title}</strong>: {message.message}</p>
                            <p><i>{new Date(message.createdAt).toLocaleString()}</i></p>
                        </div>
                    ))
                ) : (
                    <p>No notifications yet.</p>
                )}
            </div>
        </div>
    );
}

export default Notification;
