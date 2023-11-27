import React, { useEffect, useState } from 'react'
import './Timer.css'

function Timer() {

    const [timeUntilMidnight, setTimeUntilMidnight] = useState(calculateTimeUntilMidnight());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeUntilMidnight(calculateTimeUntilMidnight());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function calculateTimeUntilMidnight() {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
        const timeDifference = midnight - now;
        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

        return { hours, minutes, seconds };
    }

    return (
        <p className='text_timer'>
            {timeUntilMidnight.hours}h {timeUntilMidnight.minutes}m {timeUntilMidnight.seconds}s
        </p>
    )
}

export default Timer