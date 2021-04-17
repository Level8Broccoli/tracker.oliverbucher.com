import React from 'react';

type Props = {
    children: JSX.Element[];
    closeToast: () => void;
};

export default function Toast({ closeToast, children }: Props): JSX.Element {
    return (
        <div className="Toast">
            <button className="delete" aria-label="delete" onClick={closeToast}>
                <i className="fad fa-times"></i>
            </button>
            {children}
        </div>
    );
}
