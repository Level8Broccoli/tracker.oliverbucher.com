import React from 'react';

type Props = {
    children: JSX.Element;
    type?: string;
    closeToast: () => void;
};

export default function Toast({ closeToast, type = 'info', children }: Props): JSX.Element {
    return (
        <div className={`Toast ${type}`}>
            <button className="delete" aria-label="delete" onClick={closeToast}>
                <i className="fad fa-times"></i>
            </button>
            {children}
        </div>
    );
}
