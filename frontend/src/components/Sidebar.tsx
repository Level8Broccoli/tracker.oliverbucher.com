import React from 'react';

type Props = {
    children: JSX.Element;
};

export default function Sidebar({ children }: Props): JSX.Element {
    return <aside className="Sidebar">{children}</aside>;
}
