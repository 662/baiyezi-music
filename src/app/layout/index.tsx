import React from 'react';

export default function Layout({ children }: any) {
    return (
        <div>
            <div>left</div>
            <div>{children}</div>
            <div>footer</div>
        </div>
    );
}
