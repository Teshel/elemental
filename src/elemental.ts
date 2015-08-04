/**
 * Created by jmichaels on 7/22/15.
 */
///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/underscore/underscore.d.ts" />
import $ = require("jquery");
import _ = require("underscore");

export class Element {
    abbr: string;
    name: string;
    num: number;
    group: string;

    constructor(abbr: string, data: any[]) {
        this.abbr = abbr;
        this.name = data[0]||"";
        this.num = data[1]||0;
        this.group = data[2]||"";
    }

    toDiv(): JQuery {
        return $('<div/>')
            .addClass("element")
            .addClass(this.group)
            .append(createClassDiv("number", this.num.toString()),
                    createClassDiv("abbr", this.abbr),
                    createClassDiv("name", this.name));
    }

    toIconDiv(): JQuery {
        return $('<div/>')
            .addClass("elementIcon")
            .addClass(this.group)
            .append(createClassDiv("abbr", this.abbr));
    }
}

export class App {
    resultsBox: JQuery;
    inputString: JQuery;
    searchButton: JQuery;
    table: Table;
    max: number;

    constructor() {
        this.resultsBox = $('#results-box');
        this.inputString = $('#periodic-input-string');
        this.searchButton = $('#periodic-search-button');
        this.max = 0;

        this.searchButton.click((e: Event) => {
            console.log(this.inputString);
            var solutions = this.matchSentence(this.inputString.val());
            this.resultsBox.html('');
            if (solutions.length > 0) {
                solutions.forEach((solution: Element[]) => {
                    console.log("Outer loop");
                    var solutionDiv = createSolutionDiv();
                    solution.forEach((element: Element) => {
                        //console.log(element.name);
                        solutionDiv.append(element.toIconDiv());
                    });
                    //Periodic.ResultsBox.appendChild(document.createElement('br'));
                    this.resultsBox.append(solutionDiv);
                    //resultsBox.add
                });
            } else {
                this.resultsBox.html("No possible element combination found.");
            }
        });

        this.inputString.keyup((e: KeyboardEvent) => {
            if (e.keyCode == 13) {
                this.searchButton.click();
            }
        });
    }

    makeTable(data: {[key: string]: any}) {
        //var table: Table = {};
        this.table = {};
        for (var k in data) {
            if (this.max < k.length) {
                this.max = k.length;
            }
            this.table[k.toLowerCase()] = new Element(k, data[k]);
        }
    }

    matchSentence(sentence: string): Element[][] {
        return this.matchWordRec([], sentence.replace(/[^a-zA-Z ]/g, "").toLowerCase());
    }

    matchWordRec(elements: Element[], input: string): Element[][] {
        var word = input.trim();
        if (word != undefined && word.length > 0) {
            // strategy: search through each substring (1..maxwordlength)
            // at each recursive call, solutions represents an
            // array of possible solutions
            var solutions: Element[][] = [];
            for (var i = 1; (i <= this.max && i <= word.length); i++) {
                var curmatch: Element = this.table[word.substring(0, i)];
                console.log('substring: ' + word.substring(0, i)+ '; full string: ' + word);
                if (curmatch != undefined) {
                    // matchWordRec (this function) returns an array of solutions
                    // which are each an array of Element objects
                    this.matchWordRec(elements.concat(curmatch), word.substring(i, word.length))
                        .forEach((solution: Element[]) => {
                            solutions.push(solution);
                        });
                }
            }
            return solutions;
        } else {
            // if the input string (word) is undefined or empty, that means
            // we ran out of input to match and elements contains a successful path
            // put inside an array to maintain the invariant for solutions
            return [elements];
        }
    }
}

export interface Table { [key: string]: Element }

function createClassDiv(className: string, content: string): JQuery {
    return $('<div/>')
        .addClass(className)
        .text(content);
}

function createSolutionDiv(): JQuery {
    return $('<div/>')
        .addClass("solution")
        .append($('<div/>').addClass("header").text("Solution"));
}

export function start() {
    //console.log($('#periodic-input-string'));
    var app: App = new App();
    //console.log(app.inputString);
    app.makeTable({
        "H": ["Hydrogen", 1, "default", [0,0]],
        "He": ["Helium",  2, "noble",   [0,1]],
        "Li": ["Lithium", 3, "alkali"],
        "Be": ["Beryllium", 4, "alkaline"],
        "B": ["Boron", 5, "other"],
        "C": ["Carbon", 6, "other"],
        "N": ["Nitrogen", 7, "other"],
        "O": ["Oxygen", 8, "other"],
        "F": ["Fluorine", 9, "other"],
        "Ne": ["Neon", 10, "noble"],
        "Na": ["Sodium", 11, "alkali"],
        "Mg": ["Magnesium", 12, "alkaline"],
        "Al": ["Aluminium", 13, "poorMetals"],
        "Si": ["Silicon", 14, "other"],
        "P": ["Phosphorus", 15, "other"],
        "S": ["Sulfur", 16, "other"],
        "Cl": ["Chlorine", 17, "other"],
        "Ar": ["Argon", 18, "noble"],
        "K": ["Potassium", 19, "alkali"],
        "Ca": ["Calcium", 20, "alkaline"],
        "Sc": ["Scandium", 21, "transitionMetals"],
        "Ti": ["Titanium", 22, "transitionMetals"],
        "V": ["Vanadium", 23, "transitionMetals"],
        "Cr": ["Chromium", 24, "transitionMetals"],
        "Mn": ["Manganese", 25, "transitionMetals"],
        "Fe": ["Iron", 26, "transitionMetals"],
        "Co": ["Cobalt", 27, "transitionMetals"],
        "Ni": ["Nickel", 28, "transitionMetals"],
        "Cu": ["Copper", 29, "transitionMetals"],
        "Zn": ["Zinc", 30, "poorMetals"],
        "Ga": ["Gallium", 31, "poorMetals"],
        "Ge": ["Germanium", 32, "poorMetals"],
        "As": ["Arsenic", 33, "other"],
        "Se": ["Selenium", 34, "other"],
        "Br": ["Bromine", 35, "other"],
        "Kr": ["Krypton", 36, "noble"],
        "Rb": ["Rubidium", 37, "alkali"],
        "Sr": ["Strontium", 38, "alkaline"],
        "Y": ["Yttrium", 39, "transitionMetals"],
        "Zr": ["Zirconium", 40, "transitionMetals"],
        "Nb": ["Niobium", 41, "transitionMetals"],
        "Mo": ["Molybdenum", 42, "transitionMetals"],
        "Tc": ["Technetium", 43, "transitionMetals"],
        "Ru": ["Ruthenium", 44, "transitionMetals"],
        "Rh": ["Rhodium", 45, "transitionMetals"],
        "Pd": ["Palladium", 46, "transitionMetals"],
        "Ag": ["Silver", 47, "transitionMetals"],
        "Cd": ["Cadmium", 48, "poorMetals"],
        "In": ["Indium", 49, "poorMetals"],
        "Sn": ["Tin", 50, "poorMetals"],
        "Sb": ["Antimony", 51, "poorMetals"],
        "Te": ["Tellurium", 52, "other"],
        "I": ["Iodine", 53, "other"],
        "Xe": ["Xenon", 54, "noble"],
        "Cs": ["Cesium", 55, "alkali"],
        "Ba": ["Barium", 56, "alkaline"],
        "La": ["Lanthanum", 57, "lanthanoids"],
        "Ce": ["Cerium", 58, "lanthanoids"],
        "Pr": ["Praseodymium", 59, "lanthanoids"],
        "Nd": ["Neodymium", 60, "lanthanoids"],
        "Pm": ["Promethium", 61, "lanthanoids"],
        "Sm": ["Samarium", 62, "lanthanoids"],
        "Eu": ["Europium", 63, "lanthanoids"],
        "Gd": ["Gadolinium", 64, "lanthanoids"],
        "Tb": ["Terbium", 65, "lanthanoids"],
        "Dy": ["Dysprosium", 66, "lanthanoids"],
        "Ho": ["Holmium", 67, "lanthanoids"],
        "Er": ["Erbium", 68, "lanthanoids"],
        "Tm": ["Thulium", 69, "lanthanoids"],
        "Yb": ["Ytterbium", 70, "lanthanoids"],
        "Lu": ["Lutetium", 71, "lanthanoids"],
        "Hf": ["Hafnium", 72, "transitionMetals"],
        "Ta": ["Tantalum", 73, "transitionMetals"],
        "W": ["Tungsten", 74, "transitionMetals"],
        "Re": ["Rhenium", 75, "transitionMetals"],
        "Os": ["Osmium", 76, "transitionMetals"],
        "Ir": ["Iridium", 77, "transitionMetals"],
        "Pt": ["Platinum", 78, "transitionMetals"],
        "Au": ["Gold", 79, "transitionMetals"],
        "Hg": ["Mercury", 80, "poorMetals"],
        "Tl": ["Thallium", 81, "poorMetals"],
        "Pb": ["Lead", 82, "poorMetals"],
        "Bi": ["Bismuth", 83, "poorMetals"],
        "Po": ["Polonium", 84, "poorMetals"],
        "At": ["Astatine", 85, "other"],
        "Rn": ["Radon", 86, "noble"],
        "Fr": ["Francium", 87, "alkali"],
        "Ra": ["Radium", 88, "alkaline"],
        "Ac": ["Actinium", 89, "actinoids"],
        "Th": ["Thorium", 90, "actinoids"],
        "Pa": ["Protactinium", 91, "actinoids"],
        "U": ["Uranium", 92, "actinoids"],
        "Np": ["Neptunium", 93, "actinoids"],
        "Pu": ["Plutonium", 94, "actinoids"],
        "Am": ["Americium", 95, "actinoids"],
        "Cm": ["Curium", 96, "actinoids"],
        "Bk": ["Berkelium", 97, "actinoids"],
        "Cf": ["Californium", 98, "actinoids"],
        "Es": ["Einsteinium", 99, "actinoids"],
        "Fm": ["Fermium", 100, "actinoids"],
        "Md": ["Mendelevium", 101, "actinoids"],
        "No": ["Nobelium", 102, "actinoids"],
        "Lr": ["Lawrencium", 103, "actinoids"],
        "Rf": ["Rutherfordium", 104, "transitionMetals"],
        "Db": ["Dubnium", 105, "transitionMetals"],
        "Sg": ["Seaborgium", 106, "transitionMetals"],
        "Bh": ["Bohrium", 107, "transitionMetals"],
        "Hs": ["Hassium", 108, "transitionMetals"],
        "Mt": ["Meitnerium", 109, "transitionMetals"],
        "Ds": ["Darmstadtium", 110, "transitionMetals"],
        "Rg": ["Roentgenium", 111, "transitionMetals"],
        "Cn": ["Copernicium", 112, "transitionMetals"],
        "Fl": ["Flerovium", 114, "default"],
        "Lv": ["Livermorium", 116, "default"]
    });
}