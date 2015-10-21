var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ElementTableItem = (function (_super) {
    __extends(ElementTableItem, _super);
    function ElementTableItem() {
        _super.apply(this, arguments);
    }
    ElementTableItem.prototype.render = function () {
        var className = "elementIcon noselect " + this.props.group;
        return (React.createElement("div", {"className": className}, React.createElement("div", {"className": 'abbr'}, this.props.abbr), React.createElement("div", {"className": 'num'}, this.props.num)));
    };
    return ElementTableItem;
})(React.Component);
exports.ElementTableItem = ElementTableItem;
