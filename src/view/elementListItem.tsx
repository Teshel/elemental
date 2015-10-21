import React = require('react');

interface ElementListItemProps {
    abbr: string;
    group: string;
}

export class ElementListItem extends React.Component<ElementListItemProps, any> {
    render() {
        return (
            <div className='elementIcon noselect {this.props.group}'>
                <div className='abbr'>{this.props.abbr}</div>
            </div>
        );
    }
}
