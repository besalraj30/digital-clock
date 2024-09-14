import { useEffect, useState } from "react";

const Clock = () => {

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [pm, setPm] = useState(false);
    const [updatedTime, setUpdatedTime] = useState(time);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const hour = new Date().getHours();
        setPm(hour>=12);
    }, [time])

    useEffect(() => {
        const [hour, minute, second] = time.split(":");
        let formattedHours = parseInt(hour, 10);
        console.log(formattedHours);
        if(pm)
        {
            formattedHours = formattedHours %12 || 12;
            const formattedTime = `${formattedHours.toString().padStart(2, '0')} : ${minute} : ${second}`
            setUpdatedTime(formattedTime);
        } else if(formattedHours ==0) {
            formattedHours = 12;
        }
    }, [time, pm]);

    return (
        <div>
            <h1>Clock</h1>
                {pm ? updatedTime : time} {pm ? 'PM' : "AM"}
        </div>
    )
}

export default Clock;