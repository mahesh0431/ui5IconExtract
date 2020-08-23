// read font file
console.log('Test');
// const FontEditor = require('fonteditor-core');
import FontEditor from 'fonteditor-core/main';
import svgpath from 'svgpath';
const axios = require('axios').default;

import glyf2svg from 'fonteditor-core/ttf/util/glyf2svg';
import glyfAdjust from 'fonteditor-core/ttf/util/glyfAdjust';
let ttf;
let iconsMap;

function isArray(obj) {
    return obj != null && Array.isArray(obj);
}

function isObject(obj) {
    if (obj === null) {
        return false;
    }
    return ((typeof obj === 'function') || (typeof obj === 'object'));
}

function clone(source) {
    if (!source || typeof source !== 'object') {
        return source;
    }

    let cloned = source;

    if (isArray(source)) {
        cloned = source.slice().map(clone);
    } else if (isObject(source) && 'isPrototypeOf' in source) {
        cloned = {};
        for (let key of Object.keys(source)) {
            cloned[key] = clone(source[key]);
        }
    }

    return cloned;
}

function showGlyf(charcode) {
    // let svg = tpl;
    let glyf = clone(ttf.getGlyfByCode(charcode));
    if (glyf.compound) {
        return;
    }
    glyfAdjust(glyf, 0.06, 0.06);
    let path = glyf2svg(glyf);

    var height = glyf.yMax - glyf.yMin;
    var revheight = -1 * height;
    let tpl = '' +
        '<svg class="glyf" ' + 'width=' + glyf.xMax + ' height=' + height + ' >' +
        ' <g transform="scale(1, -1)  translate(0, ' + revheight + ')">' +
        '<path class="path" d=" ' + path + '" style="fill: red;' + '" />' +
        '</g>' +
        '</svg>';
    return tpl;
}

function loadUI5Icons() {
    return new Promise(function (resolve, reject) {
        if (!iconsMap) {
            axios({
                method: 'get',
                responseType: 'arraybuffer',
                url: 'https://openui5.hana.ondemand.com/resources/sap/ui/core/themes/base/fonts/SAP-icons.woff2'
            }).then(function (response) {
                FontEditor.woff2.init('../node_modules/fonteditor-core/woff2/woff2.wasm').then(() => {
                    let ttfBuffer = FontEditor.woff2tottf(response.data);
                    let ttfReader = new FontEditor.TTFReader();
                    let ttfData = ttfReader.read(ttfBuffer);
                    ttf = new FontEditor.TTF(ttfData);
                    let iconsDet = {};
                    ttf.codes().forEach(function (iconNumber) {
                        iconsDet[Number(iconNumber).toString(16)] = parseInt(iconNumber);
                        return iconsDet;
                    });
                    // resolve(showGlyf(57806, ttfData));
                    resolve(iconsDet);
                });

            }).catch(function () {
                reject();
                console.error('error read file');
            });
        } else {
            resolve(iconsMap);
        }
    });
}
export function getUI5IconSVG(iconID) {
    return new Promise(function (resolve, reject) {
        loadUI5Icons().then(function(icons){
            let iconNumber = icons[iconID];
            resolve(showGlyf(iconNumber));
        });
    });
}
export function getUI5IconsDetails() {
    return new Promise(function (resolve, reject) {
        loadUI5Icons().then(function(icons){
            resolve(icons);
        });
    });
}