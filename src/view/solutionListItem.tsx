import React = require('react');
import {ElementListItem} from './elementListItem';

export class SolutionListItem extends React.Component<any, any> {
    render() {
        return (
            <div className='solution'>
                <div className='header'>Solution</div>
                { this.props.elements.map((element) => {
                    <ElementListItem abbr={element.abbr} />
                })}
            </div>
        )
    }
}
