import {getUI5IconSVG, getUI5IconsDetails} from '../../src/UI5IconExtract';

// readOpenUI5Icons().then(function(svg){
//     var container = document.getElementById("svg-view");
//     container.innerHTML = svg;
//     console.log("Triggeredyola");
// });
getUI5IconsDetails().then(function(icons){
    console.log(icons);
    getUI5IconSVG("e035").then(function(svg){
    var container = document.getElementById("svg-view");
    container.innerHTML = svg;
    console.log("Triggeredyola");
    });
});