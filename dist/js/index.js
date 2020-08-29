import {getUI5IconSVG, getIconsNames} from '../../src/UI5IconExtract';

// readOpenUI5Icons().then(function(svg){
//     var container = document.getElementById("svg-view");
//     container.innerHTML = svg;
//     console.log("Triggeredyola");
// });
console.log(getIconsNames());

    getUI5IconSVG("add-employee").then(function(svg){
        var container = document.getElementById("svg-view");
            container.innerHTML = svg;
    });