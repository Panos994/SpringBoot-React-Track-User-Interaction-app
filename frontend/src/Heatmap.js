import React, { useEffect } from 'react';
import h337 from 'heatmap.js';
//under construction
const Heatmap = ({ events }) => {
    useEffect(() => {
        const heatmapInstance = h337.create({
            container: document.querySelector('.heatmap')
        });

        const heatmapData = events.map(event => ({
            x: parseInt(event.mouseCoordinates.split('x:')[1].split(',')[0], 10),
            y: parseInt(event.mouseCoordinates.split('y:')[1], 10),
            value: 1
        }));

        heatmapInstance.setData({
            max: 5,
            data: heatmapData
        });
    }, [events]);

    return <div className="heatmap" style={{ width: '100%', height: '100vh', position: 'relative' }}></div>;
};

export default Heatmap;
