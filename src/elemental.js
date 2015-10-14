/**
 * Created by jmichaels on 7/22/15.
 */
///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/underscore/underscore.d.ts" />
var $ = require("jquery");
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
})();
exports.Point = Point;
var Element = (function () {
    function Element(abbr, data) {
        this.abbr = abbr;
        this.name = data[0] || "";
        this.num = data[1] || 0;
        this.group = data[2] || "";
        if (data[3] != null) {
            this.location = new Point(data[3][0], data[3][1]);
        }
        else {
            this.location = new Point(0, 0);
        }
    }
    Element.prototype.toDiv = function () {
        return $('<div/>').addClass("element").addClass(this.group).append(createClassDiv("number", this.num.toString()), createClassDiv("abbr", this.abbr), createClassDiv("name", this.name));
    };
    Element.prototype.toIconDiv = function () {
        return $('<div/>').addClass("elementIcon").addClass(this.group).append(createClassDiv("abbr", this.abbr));
    };
    return Element;
})();
exports.Element = Element;
var App = (function () {
    function App() {
        var _this = this;
        this.resultsBox = $('#results-box');
        this.inputString = $('#periodic-input-string');
        this.searchButton = $('#periodic-search-button');
        //this.inputString.val('foo');
        this.max = 0;
        this.searchButton.click(function (e) {
            console.log(_this.inputString);
            var solutions = _this.matchSentence(_this.inputString.val());
            _this.resultsBox.html('');
            if (solutions.length > 0) {
                solutions.forEach(function (solution) {
                    console.log("Outer loop");
                    var solutionDiv = createSolutionDiv();
                    solution.forEach(function (element) {
                        //console.log(element.name);
                        solutionDiv.append(element.toIconDiv());
                    });
                    //Periodic.ResultsBox.appendChild(document.createElement('br'));
                    _this.resultsBox.append(solutionDiv);
                    //resultsBox.add
                });
            }
            else {
                _this.resultsBox.html("No possible element combination found.");
            }
        });
        this.inputString.keyup(function (e) {
            if (e.keyCode == 13) {
                _this.searchButton.click();
            }
        });
    }
    App.prototype.makeTable = function (data) {
        //var table: Table = {};
        this.table = {};
        for (var k in data) {
            if (this.max < k.length) {
                this.max = k.length;
            }
            this.table[k.toLowerCase()] = new Element(k, data[k]);
        }
    };
    App.prototype.renderTable = function () {
        var table = $('<div/>').addClass("mainTable");
        for (var k in this.table) {
            this.table[k].location.x;
            this.table[k].location.y;
        }
    };
    App.prototype.matchSentence = function (sentence) {
        return this.matchWordRec([], sentence.replace(/[^a-zA-Z ]/g, "").toLowerCase());
    };
    App.prototype.matchWordRec = function (elements, input) {
        var word = input.trim();
        if (word != undefined && word.length > 0) {
            // strategy: search through each substring (1..maxwordlength)
            // at each recursive call, solutions represents an
            // array of possible solutions
            var solutions = [];
            for (var i = 1; (i <= this.max && i <= word.length); i++) {
                var curmatch = this.table[word.substring(0, i)];
                console.log('substring: ' + word.substring(0, i) + '; full string: ' + word);
                if (curmatch != undefined) {
                    // matchWordRec (this function) returns an array of solutions
                    // which are each an array of Element objects
                    this.matchWordRec(elements.concat(curmatch), word.substring(i, word.length)).forEach(function (solution) {
                        solutions.push(solution);
                    });
                }
            }
            return solutions;
        }
        else {
            // if the input string (word) is undefined or empty, that means
            // we ran out of input to match and elements contains a successful path
            // put inside an array to maintain the invariant for solutions
            return [elements];
        }
    };
    return App;
})();
exports.App = App;
function createClassDiv(className, content) {
    return $('<div/>').addClass(className).text(content);
}
function createSolutionDiv() {
    return $('<div/>').addClass("solution").append($('<div/>').addClass("header").text("Solution"));
}
function start() {
    //console.log($('#periodic-input-string'));
    var app = new App();
    //console.log(app.inputString);
    app.makeTable({
        "H": ["Hydrogen", 1, "default", [0, 0]],
        "He": ["Helium", 2, "noble", [17, 0]],
        "Li": ["Lithium", 3, "alkali", [0, 1]],
        "Be": ["Beryllium", 4, "alkaline", [1, 1]],
        "B": ["Boron", 5, "other", [12, 1]],
        "C": ["Carbon", 6, "other", [13, 1]],
        "N": ["Nitrogen", 7, "other", [14, 1]],
        "O": ["Oxygen", 8, "other", [15, 1]],
        "F": ["Fluorine", 9, "other", [16, 1]],
        "Ne": ["Neon", 10, "noble", [17, 1]],
        "Na": ["Sodium", 11, "alkali", [0, 2]],
        "Mg": ["Magnesium", 12, "alkaline", [1, 2]],
        "Al": ["Aluminium", 13, "postTransition", [12, 2]],
        "Si": ["Silicon", 14, "other", [13, 2]],
        "P": ["Phosphorus", 15, "other", [14, 2]],
        "S": ["Sulfur", 16, "other", [15, 2]],
        "Cl": ["Chlorine", 17, "other", [16, 2]],
        "Ar": ["Argon", 18, "noble", [17, 2]],
        "K": ["Potassium", 19, "alkali", [0, 3]],
        "Ca": ["Calcium", 20, "alkaline", [1, 3]],
        "Sc": ["Scandium", 21, "transitionMetals", [2, 3]],
        "Ti": ["Titanium", 22, "transitionMetals", [3, 3]],
        "V": ["Vanadium", 23, "transitionMetals", [4, 3]],
        "Cr": ["Chromium", 24, "transitionMetals", [5, 3]],
        "Mn": ["Manganese", 25, "transitionMetals", [6, 3]],
        "Fe": ["Iron", 26, "transitionMetals", [7, 3]],
        "Co": ["Cobalt", 27, "transitionMetals", [8, 3]],
        "Ni": ["Nickel", 28, "transitionMetals", [9, 3]],
        "Cu": ["Copper", 29, "transitionMetals", [10, 3]],
        "Zn": ["Zinc", 30, "transitionMetals", [11, 3]],
        "Ga": ["Gallium", 31, "postTransition", [12, 3]],
        "Ge": ["Germanium", 32, "metalloids", [13, 3]],
        "As": ["Arsenic", 33, "metalloids", [14, 3]],
        "Se": ["Selenium", 34, "otherNonmetals", [15, 3]],
        "Br": ["Bromine", 35, "halogens", [16, 3]],
        "Kr": ["Krypton", 36, "noble", [17, 3]],
        "Rb": ["Rubidium", 37, "alkali", [0, 4]],
        "Sr": ["Strontium", 38, "alkaline", [1, 4]],
        "Y": ["Yttrium", 39, "transitionMetals", [2, 4]],
        "Zr": ["Zirconium", 40, "transitionMetals", [3, 4]],
        "Nb": ["Niobium", 41, "transitionMetals", [4, 4]],
        "Mo": ["Molybdenum", 42, "transitionMetals", [5, 4]],
        "Tc": ["Technetium", 43, "transitionMetals", [6, 4]],
        "Ru": ["Ruthenium", 44, "transitionMetals", [7, 4]],
        "Rh": ["Rhodium", 45, "transitionMetals", [8, 4]],
        "Pd": ["Palladium", 46, "transitionMetals", [9, 4]],
        "Ag": ["Silver", 47, "transitionMetals", [10, 4]],
        "Cd": ["Cadmium", 48, "transitionMetals", [11, 4]],
        "In": ["Indium", 49, "postTransition", [12, 4]],
        "Sn": ["Tin", 50, "postTransition", [13, 4]],
        "Sb": ["Antimony", 51, "metalloids", [14, 4]],
        "Te": ["Tellurium", 52, "metalloids", [15, 4]],
        "I": ["Iodine", 53, "halogens", [16, 4]],
        "Xe": ["Xenon", 54, "noble", [17, 4]],
        "Cs": ["Cesium", 55, "alkali", [0, 5]],
        "Ba": ["Barium", 56, "alkaline", [1, 5]],
        "La": ["Lanthanum", 57, "lanthanoids", [3, 8]],
        "Ce": ["Cerium", 58, "lanthanoids", [4, 8]],
        "Pr": ["Praseodymium", 59, "lanthanoids", [5, 8]],
        "Nd": ["Neodymium", 60, "lanthanoids", [6, 8]],
        "Pm": ["Promethium", 61, "lanthanoids", [7, 8]],
        "Sm": ["Samarium", 62, "lanthanoids", [8, 8]],
        "Eu": ["Europium", 63, "lanthanoids", [9, 8]],
        "Gd": ["Gadolinium", 64, "lanthanoids", [10, 8]],
        "Tb": ["Terbium", 65, "lanthanoids", [11, 8]],
        "Dy": ["Dysprosium", 66, "lanthanoids", [12, 8]],
        "Ho": ["Holmium", 67, "lanthanoids", [13, 8]],
        "Er": ["Erbium", 68, "lanthanoids", [14, 8]],
        "Tm": ["Thulium", 69, "lanthanoids", [15, 8]],
        "Yb": ["Ytterbium", 70, "lanthanoids", [16, 8]],
        "Lu": ["Lutetium", 71, "lanthanoids", [17, 8]],
        "Hf": ["Hafnium", 72, "transitionMetals", [3, 5]],
        "Ta": ["Tantalum", 73, "transitionMetals", [4, 5]],
        "W": ["Tungsten", 74, "transitionMetals", [5, 5]],
        "Re": ["Rhenium", 75, "transitionMetals", [6, 5]],
        "Os": ["Osmium", 76, "transitionMetals", [7, 5]],
        "Ir": ["Iridium", 77, "transitionMetals", [8, 5]],
        "Pt": ["Platinum", 78, "transitionMetals", [9, 5]],
        "Au": ["Gold", 79, "transitionMetals", [10, 5]],
        "Hg": ["Mercury", 80, "transitionMetals", [11, 5]],
        "Tl": ["Thallium", 81, "postTransition", [12, 5]],
        "Pb": ["Lead", 82, "postTransition", [13, 5]],
        "Bi": ["Bismuth", 83, "postTransition", [14, 5]],
        "Po": ["Polonium", 84, "metalloids", [15, 5]],
        "At": ["Astatine", 85, "halogens", [16, 5]],
        "Rn": ["Radon", 86, "noble", [17, 5]],
        "Fr": ["Francium", 87, "alkali", [0, 6]],
        "Ra": ["Radium", 88, "alkaline", [1, 6]],
        "Ac": ["Actinium", 89, "actinoids", [3, 9]],
        "Th": ["Thorium", 90, "actinoids", [4, 9]],
        "Pa": ["Protactinium", 91, "actinoids", [5, 9]],
        "U": ["Uranium", 92, "actinoids", [6, 9]],
        "Np": ["Neptunium", 93, "actinoids", [7, 9]],
        "Pu": ["Plutonium", 94, "actinoids", [8, 9]],
        "Am": ["Americium", 95, "actinoids", [9, 9]],
        "Cm": ["Curium", 96, "actinoids", [10, 9]],
        "Bk": ["Berkelium", 97, "actinoids", [11, 9]],
        "Cf": ["Californium", 98, "actinoids", [12, 9]],
        "Es": ["Einsteinium", 99, "actinoids", [13, 9]],
        "Fm": ["Fermium", 100, "actinoids", [14, 9]],
        "Md": ["Mendelevium", 101, "actinoids", [15, 9]],
        "No": ["Nobelium", 102, "actinoids", [16, 9]],
        "Lr": ["Lawrencium", 103, "actinoids", [17, 9]],
        "Rf": ["Rutherfordium", 104, "transitionMetals", [3, 6]],
        "Db": ["Dubnium", 105, "transitionMetals", [4, 6]],
        "Sg": ["Seaborgium", 106, "transitionMetals", [5, 6]],
        "Bh": ["Bohrium", 107, "transitionMetals", [6, 6]],
        "Hs": ["Hassium", 108, "transitionMetals", [7, 6]],
        "Mt": ["Meitnerium", 109, "transitionMetals", [8, 6]],
        "Ds": ["Darmstadtium", 110, "transitionMetals", [9, 6]],
        "Rg": ["Roentgenium", 111, "transitionMetals", [10, 6]],
        "Cn": ["Copernicium", 112, "transitionMetals", [11, 6]],
        "Fl": ["Flerovium", 114, "postTransition", [13, 6]],
        "Lv": ["Livermorium", 116, "postTransition", [15, 6]]
    });
}
exports.start = start;
//# sourceMappingURL=elemental.js.map