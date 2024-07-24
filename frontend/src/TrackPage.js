import React, { useEffect } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const TrackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        console.log('JWT Token in TrackPage:', token); // Add this log
        if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        const handleMouseMove = _.throttle((event) => {
            const trackingEvent = {
                ip: '127.0.0.1', // Ideally, get the real IP on the server-side
                eventType: 'mouse_move',
                eventData: `Mouse moved to (${event.clientX}, ${event.clientY})`,
                timestamp: new Date().toISOString(),
                website: { id: 1 }, // Example website ID
                sessionId: 'unique-session-id', // Generate or retrieve a session ID
                mouseCoordinates: `x:${event.clientX},y:${event.clientY}`,
                pageUrl: window.location.href,
                elementId: event.target.id
            };

            sendTrackingEvent(trackingEvent, token);
        }, 1000);

        const handleKeyDown = (event) => {
            const trackingEvent = {
                ip: '127.0.0.1',
                eventType: 'key_down',
                eventData: `Key pressed: ${event.key}`,
                timestamp: new Date().toISOString(),
                website: { id: 1 },
                sessionId: 'unique-session-id',
                pageUrl: window.location.href,
                elementId: event.target.id
            };

            sendTrackingEvent(trackingEvent, token);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

    const sendTrackingEvent = async (event, token) => {
        try {
            console.log('JWT Token in sendTrackingEvent:', token); // Ensure this logs the token

            const response = await fetch('http://localhost:9090/api/tracking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Ensure token is included
                },
                body: JSON.stringify(event)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Tracking event sent successfully');
        } catch (error) {
            console.error('Error tracking event:', error);
        }
    };



    return (
        <div>
            <h1>Track User Interactions</h1>
            <button id="button1">Click Me</button>
        </div>
    );
};

export default TrackPage;
