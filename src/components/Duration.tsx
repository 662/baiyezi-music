import React from 'react';

const Duration = ({ value }: { value: number }) => {
    function full(v: number) {
        return v < 10 ? '0' + v : v;
    }
    const dateTime = new Date(value);
    const m = dateTime.getMinutes();
    const s = dateTime.getSeconds();
    const time = full(m) + ':' + full(s);
    return <small>{time}</small>;
};

export default Duration;
