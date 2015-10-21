import React = require('react');
import {Element} from '../elemental';
import {ElementListItem} from './elementListItem';

interface SolutionListItemProps {
    elements: Element[];
}

export class SolutionListItem extends React.Component<SolutionListItemProps, any> {
    render() {
        return (
            <div className='solution'>
                <div className='header'>Solution</div>
                { this.props.elements.map((element) => {
                    <ElementListItem abbr={element.abbr} group={element.group} />
                })}
            </div>
        )
    }
}

interface SolutionListProps {
    solutions: Element[][];
}

export class SolutionList extends React.Component<SolutionListProps, any> {
    render() {
        var solutions: React.ReactElement<any>[] = [];
        this.props.solutions.forEach((solution) => {
             solutions.push(<SolutionListItem elements={solution} />);
        });
        return (
            <div className='results-box'>
                {solutions}
            </div>
        );
    }
}
