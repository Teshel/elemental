var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ElementListItem = (function (_super) {
    __extends(ElementListItem, _super);
    function ElementListItem() {
        _super.apply(this, arguments);
    }
    ElementListItem.prototype.render = function () {
        return (React.createElement("div", {"className": 'elementIcon noselect {this.props.group}'}, React.createElement("div", {"className": 'abbr'}, this.props.abbr)));
    };
    return ElementListItem;
})(React.Component);
exports.ElementListItem = ElementListItem;
