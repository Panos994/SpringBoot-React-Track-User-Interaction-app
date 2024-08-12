import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const TrackPage = () => {
    const navigate = useNavigate();
    const [typingStartTime, setTypingStartTime] = useState(null);
    const [eventTypes, setEventTypes] = useState([]);
    const [error, setError] = useState(null);
    const [eventLog, setEventLog] = useState([]);
    const [isTracking, setIsTracking] = useState(false); // New state to track if tracking is active

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/login');
            return;
        }

        const handleMouseMove = _.throttle((event) => {
            if (isTracking) {
                const trackingEvent = createTrackingEvent('mouse_move', `Mouse moved to (${event.clientX}, ${event.clientY})`, token, event);
                sendTrackingEvent(trackingEvent, token);
            }
        }, 1000);

        const handleKeyDown = (event) => {
            if (isTracking) {
                const trackingEvent = createTrackingEvent('key_down', `Key pressed: ${event.key}`, token, event);
                sendTrackingEvent(trackingEvent, token);
            }
        };

        const handleClick = (event) => {
            if (isTracking) {
                const trackingEvent = createTrackingEvent('button_click', `Button clicked: ${event.target.id}`, token, event);
                sendTrackingEvent(trackingEvent, token);
            }
        };

        const handleScroll = _.throttle(() => {
            if (isTracking) {
                const trackingEvent = createTrackingEvent('scroll', `Page scrolled to (${window.scrollX}, ${window.scrollY})`, token, { target: { id: 'window' } });
                sendTrackingEvent(trackingEvent, token);
            }
        }, 1000);

        const handleTyping = (event) => {
            if (isTracking) {
                if (!typingStartTime) {
                    setTypingStartTime(new Date().getTime());
                }

                const trackingEvent = createTrackingEvent('typing', `Typed: ${event.target.value}`, token, event);
                trackingEvent.typingDuration = typingStartTime ? (new Date().getTime() - typingStartTime) : 0;
                sendTrackingEvent(trackingEvent, token);
            }
        };

        // Attach event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('input', handleTyping);

        return () => {
            // Clean up event listeners
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('input', handleTyping);
        };
    }, [navigate, typingStartTime, isTracking]);

    const createTrackingEvent = (eventType, eventData, token, event) => ({
        ip: '127.0.0.1',
        eventType,
        eventData,
        timestamp: new Date().toISOString(),
        website: { id: 1 },
        sessionId: 'unique-session-id',
        pageUrl: window.location.href,
        elementId: event.target.id,
        token
    });

    const sendTrackingEvent = async (event, token) => {
        try {
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

            setEventLog(prevLog => [...prevLog, `${event.eventType} event saved successfully.`]);
        } catch (error) {
            console.error('Error tracking event:', error);
            setEventLog(prevLog => [...prevLog, `Failed to save ${event.eventType} event.`]);
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

    const toggleTracking = () => {
        setIsTracking(!isTracking);
        if (!isTracking) {
            setEventLog(prevLog => [...prevLog, 'Tracking started.']);
        } else {
            setEventLog(prevLog => [...prevLog, 'Tracking stopped.']);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Track User Interactions</h1>
            <div style={styles.content}>
                <button id="button1" style={styles.button}>Click Me</button>
                <input id="inputField" type="text" placeholder="Type something..." style={styles.input} />
                <button onClick={toggleTracking} style={styles.button}>
                    {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                </button>
            </div>
            <h2 style={styles.subHeading}>All Event Types</h2>
            {error ? (
                <p style={styles.error}>Error: {error}</p>
            ) : (
                <ul style={styles.list}>
                    {eventTypes.map((eventType, index) => (
                        <li key={index} style={styles.listItem}>{eventType}</li>
                    ))}
                </ul>
            )}
            <h2 style={styles.subHeading}>Event Log</h2>
            <ul style={styles.list}>
                {eventLog.map((log, index) => (
                    <li key={index} style={styles.logItem}>{log}</li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
    },
    content: {
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        margin: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    input: {
        padding: '10px',
        margin: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: 'calc(100% - 40px)',
    },
    subHeading: {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#333',
    },
    error: {
        color: 'red',
        fontSize: '16px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        marginBottom: '20px',
    },
    listItem: {
        backgroundColor: '#e0e0e0',
        margin: '5px 0',
        padding: '10px',
        borderRadius: '4px',
    },
    logItem: {
        backgroundColor: '#d1ffd1',
        margin: '5px 0',
        padding: '10px',
        borderRadius: '4px',
        fontSize: '14px',
    }
};

export default TrackPage;
