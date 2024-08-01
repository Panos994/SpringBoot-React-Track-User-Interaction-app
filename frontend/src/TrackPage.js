import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const TrackPage = () => {
    const navigate = useNavigate();
    const [typingStartTime, setTypingStartTime] = useState(null);

    const [eventTypes, setEventTypes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        console.log('JWT Token in TrackPage:', token); // Log the token
        if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        const handleMouseMove = _.throttle((event) => {
            const trackingEvent = {
                ip: '127.0.0.1',
                eventType: 'mouse_move',
                eventData: `Mouse moved to (${event.clientX}, ${event.clientY})`,
                timestamp: new Date().toISOString(),
                website: { id: 1 },
                sessionId: 'unique-session-id',
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
            console.log('JWT Token in sendTrackingEvent:', token);

            const response = await fetch('http://localhost:9090/api/tracking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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


    useEffect(() => {
        const fetchEventTypes = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch('http://localhost:9090/api/tracking/event-types', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setEventTypes(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching event types:', error);
            }
        };

        fetchEventTypes();
    }, []);


    return (
        <div>
            <h1>Track User Interactions</h1>
            <button id="button1">Click Me</button>
            <input id="inputField" type="text" placeholder="Type something..." />
            <button onClick={() => navigate('/events?eventType={event_type}')}>View Events</button>


            <h2>All Event Types</h2>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {eventTypes.map((eventType, index) => (
                        <li key={index}>{eventType}</li>
                    ))}
                </ul>
            )}

        </div>
    );
};




export default TrackPage;
