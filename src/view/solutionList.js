var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var elementListItem_1 = require('./elementListItem');
var SolutionListItem = (function (_super) {
    __extends(SolutionListItem, _super);
    function SolutionListItem() {
        _super.apply(this, arguments);
    }
    SolutionListItem.prototype.render = function () {
        return (React.createElement("div", {"className": 'solution'}, React.createElement("div", {"className": 'header'}, "Solution"), this.props.elements.map(function (element) {
            React.createElement(elementListItem_1.ElementListItem, {"abbr": element.abbr, "group": element.group});
        })));
    };
    return SolutionListItem;
})(React.Component);
exports.SolutionListItem = SolutionListItem;
var SolutionList = (function (_super) {
    __extends(SolutionList, _super);
    function SolutionList() {
        _super.apply(this, arguments);
    }
    SolutionList.prototype.render = function () {
        var solutions = [];
        this.props.solutions.forEach(function (solution) {
            solutions.push(React.createElement(SolutionListItem, {"elements": solution}));
        });
        return (React.createElement("div", {"className": 'results-box'}, solutions));
    };
    return SolutionList;
})(React.Component);
exports.SolutionList = SolutionList;
