import React from 'react';

type Props = {
    main: JSX.Element;
    sidebar: JSX.Element;
};

export default function WithSidebar({ main, sidebar }: Props): JSX.Element {
    return (
        <div className="with-sidebar">
            <div className="is-sidebar">{sidebar}</div>
            <div className="not-sidebar">{main}</div>
        </div>
    );
}
