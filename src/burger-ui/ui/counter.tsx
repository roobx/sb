import React from 'react';
import './counter.css';

export const Counter: React.FC<{ count: number; size?: 'default' | 'small' }> = ({
    count,
    size = 'default',
}) => {
    const className = `counter counter_size_${size}`;

    return (
        <div className={className}>
            <p className="counter__num">{count}</p>
        </div>
    );
};
