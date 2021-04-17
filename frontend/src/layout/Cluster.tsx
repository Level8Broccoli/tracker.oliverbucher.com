import React from 'react';

type Props = {
    children: JSX.Element[];
};

export default function Cluster({ children }: Props): JSX.Element {
    return <div className="Cluster">{children}</div>;
}
