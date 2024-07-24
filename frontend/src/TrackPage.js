import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const TrackPage = () => {
    const navigate = useNavigate();
    const [typingStartTime, setTypingStartTime] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        console.log('JWT Token in TrackPage:', token); // Log the token
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

        const handleClick = (event) => {
            const trackingEvent = {
                ip: '127.0.0.1',
                eventType: 'button_click',
                eventData: `Button clicked: ${event.target.id}`,
                timestamp: new Date().toISOString(),
                website: { id: 1 },
                sessionId: 'unique-session-id',
                pageUrl: window.location.href,
                elementId: event.target.id
            };

            sendTrackingEvent(trackingEvent, token);
        };

        const handleScroll = _.throttle(() => {
            const trackingEvent = {
                ip: '127.0.0.1',
                eventType: 'scroll',
                eventData: `Page scrolled to (${window.scrollX}, ${window.scrollY})`,
                timestamp: new Date().toISOString(),
                website: { id: 1 },
                sessionId: 'unique-session-id',
                pageUrl: window.location.href,
                elementId: 'window'
            };

            sendTrackingEvent(trackingEvent, token);
        }, 1000);

        const handleTyping = (event) => {
            if (!typingStartTime) {
                setTypingStartTime(new Date().getTime());
            }

            const typingEvent = {
                ip: '127.0.0.1',
                eventType: 'typing',
                eventData: `Typed: ${event.target.value}`,
                timestamp: new Date().toISOString(),
                website: { id: 1 },
                sessionId: 'unique-session-id',
                pageUrl: window.location.href,
                elementId: event.target.id,
                typingDuration: typingStartTime ? (new Date().getTime() - typingStartTime) : 0
            };

            sendTrackingEvent(typingEvent, token);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('input', handleTyping);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('input', handleTyping);
        };
    }, [navigate, typingStartTime]);

    const sendTrackingEvent = async (event, token) => {
        try {
            console.log('JWT Token in sendTrackingEvent:', token); // Log the token

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
            <input id="inputField" type="text" placeholder="Type something..." />
        </div>
    );
};

export default TrackPage;
