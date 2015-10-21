import React = require('react');

interface ElementTableItemProps {
    abbr: string;
    num: number;
    group: string;
}

export class ElementTableItem extends React.Component<ElementTableItemProps, any> {
    render() {
        var className = "elementIcon noselect " + this.props.group;
        return (
            <div className={className}>
                <div className='abbr'>{this.props.abbr}</div>
                <div className='num'>{this.props.num}</div>
            </div>
        );
    }
}
