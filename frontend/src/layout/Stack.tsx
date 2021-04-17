import React from 'react';

type Props = {
    children: JSX.Element[];
};

export default function Stack({ children }: Props): JSX.Element {
    return <div className="Stack">{children}</div>;
}
