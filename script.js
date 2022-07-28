function _id(id){
    return document.getElementById(id);
}

//Colors
const bgColor = _id('bg-color');
const bgColorHex = _id('bg-color-hex');
const ccColor = _id('cc-color');
const ccColorHex = _id('cc-color-hex');
const shColor = _id('sh-color');
const shColorHex = _id('sh-color-hex');

//Sliders
const widthSlider = _id('width-slider');
const heightSlider = _id('height-slider');
const radiusSlider = _id('radius-slider');
const blurSlider = _id('blur-slider');

//Slider Values
const widthValue = _id('width-value');
const heightValue = _id('height-value');
const radiusValue = _id('radius-value');
const blurValue = _id('blur-value');

// X and Y Position Inputs
const xInput = _id('x-pos');
const yInput = _id('y-pos')

//Card & Background
const card = _id('shape');
const background = _id('shape-wrapper');

//Button
const portraitBtn = _id('portrait-btn');
const landscapeBtn = _id('landscape-btn');

// Card Max Width & Height
let cardMaxWidth = (background.offsetWidth - 80);
let cardMaxHeight = (background.offsetHeight - 80);

// Box Shadow X and Y Axis
let coordinates = {
    'x-pos' : 4,
    'y-pos' : 4
};

// Box Shadow Blur value;
let blur = 10;

// Box Shadow RGB values;
let RGB = [0,0,0];

//Update the cardMaxWidth on windows resizing event after 500ms
function updateVariables(){
    cardMaxWidth = (background.offsetWidth - 80);
    cardMaxHeight= (background.offsetHeight - 80);
    widthSlider.max = cardMaxWidth;
    heightSlider.max = cardMaxHeight;
}

let timer;
window.onresize = () => {
    clearTimeout(timer);
    timer = setTimeout(() => updateVariables(), 500);
}

//Set the default Variables
function setVariables(){
    background.style.backgroundColor = bgColorHex.value = bgColor.value = "#F2F2F2";
    card.style.backgroundColor = ccColorHex.value = ccColor.value = "#2B2B2B";
    shColorHex.value = shColor.value = "#000000";

    widthSlider.max = cardMaxWidth;
    widthSlider.value = 80;
    card.style.width = widthValue.innerHTML = '80px';

    heightSlider.max = cardMaxHeight;
    heightSlider.value = 80;
    card.style.height = heightValue.innerHTML = '80px';

    radiusSlider.max = 30;
    radiusSlider.value = 10;
    card.style.borderRadius = radiusValue.innerHTML = '10px'

    xInput.value = coordinates['x-pos'];
    yInput.value = coordinates['y-pos'];

    blurSlider.max = 100;
    blurSlider.value = blur;
    card.style.boxShadow = `${coordinates['x-pos']}px ${coordinates['y-pos']}px ${blur}px rgba(${RGB[0]},${RGB[1]},${RGB[2]}, 0.15)`;

    blurValue.innerHTML = "10px";
    return new Promise((resolve) => {
        setTimeout(() => resolve(), 500)
    });
}

setVariables().then(setPreviewBox);

//Keep Aspect Ratio of the Card
const aspectRatio = _id('aspect-ratio');

let isAspectRatio = false;

let widthRatio = 0;
let heightRatio = 0;

function updateAspectRatio(ev){ 
    isAspectRatio = true;
    switch(ev.target.value){
        case '0':
            isAspectRatio = false;
            break;
        case '1':
            widthRatio = 1;
            heightRatio = 1;
            break;
        case '2':
            widthRatio = 3;
            heightRatio = 4;
            break;
        case '3':
            widthRatio = 9;
            heightRatio = 16;
            break;
    }
    widthSlider.max = isAspectRatio ? cardMaxWidth*widthRatio/heightRatio : cardMaxWidth;
}

function keepAspectRatio(width, height){
    if(width != null){
         heightSlider.value = width * heightRatio/widthRatio;
         card.style.height = heightValue.innerHTML = heightSlider.value + 'px';
    }else if(height != null){
        widthSlider.value = height * widthRatio/heightRatio;
        card.style.width = widthValue.innerHTML = widthSlider.value + 'px';
    }
}

//Update Card Width
function updateWidth(ev){
    card.style.width = ev.target.value + 'px';
    widthValue.innerHTML = ev.target.value + 'px';
    if(isAspectRatio){
        keepAspectRatio(ev.target.value, null);
    }
    radiusSlider.max = card.offsetWidth < card.offsetHeight ? Math.ceil(card.offsetWidth*0.5) : Math.ceil(card.offsetHeight*0.5);
}

//Update Card Height
function updateHeight(ev){
    card.style.height = ev.target.value + 'px';
    heightValue.innerHTML = ev.target.value + 'px';
    if(isAspectRatio){
        keepAspectRatio(null, ev.target.value);
    }
    radiusSlider.max = card.offsetWidth < card.offsetHeight ? Math.ceil(card.offsetWidth*0.5) : Math.ceil(card.offsetHeight*0.5);  
}

//Update Card Border Radius
function updateRadius(ev){
    card.style.borderRadius = ev.target.value + 'px';
    radiusValue.innerHTML = ev.target.value + 'px';
}

//Update Card Box Shadow
function updateBoxShadow(){
    card.style.boxShadow = `${coordinates['x-pos']}px ${coordinates['y-pos']}px ${blur}px rgba(${RGB[0]},${RGB[1]},${RGB[2]}, 0.15)`;
}

function updateBlur(ev){
    blur = ev.target.value;
    blurValue.innerHTML = `${blur}px`;
    updateBoxShadow();
}

function updateBoxShadowColor(ev){
    shColorHex.value = ev.target.value.toUpperCase();
    let colorHex = ev.target.value;
    let aRgbHex = colorHex.substring(1).match(/.{1,2}/g);
    let aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    RGB = [...aRgb];
    updateBoxShadow();
}

function updatePosition(ev){
    const element = _id(ev.target.id);
    //Validate if the box shadow position is in a given range
    (element.value < (cardMaxWidth*-1/2)) ? element.value = 0 : (element.value > cardMaxWidth/2) ? element.value = cardMaxWidth/2 : '';
    coordinates[ev.target.id] = element.value;
    updateBoxShadow();
}

//Update Background Color
function updateBackgroundColor(ev){
    background.style.backgroundColor = bgColorHex.value = ev.target.value.toUpperCase();
}

//Update Card Background Color
function updateCardColor(ev){
    card.style.backgroundColor = ccColorHex.value = ev.target.value.toUpperCase();
}

bgColor.addEventListener('input',updateBackgroundColor);
ccColor.addEventListener('input',updateCardColor);
shColor.addEventListener('input',updateBoxShadowColor);

aspectRatio.addEventListener('change', updateAspectRatio);

widthSlider.addEventListener('input',updateWidth);
heightSlider.addEventListener('input',updateHeight);
radiusSlider.addEventListener('input', updateRadius);
blurSlider.addEventListener('input', updateBlur);

xInput.addEventListener('input',updatePosition);
yInput.addEventListener('input',updatePosition);

//Observe Changes on Card Element
function Observe(element, opt, cb){
    const Obs = new MutationObserver((m) => [...m].forEach(cb));
    Obs.observe(element, opt);
};

//Then, Output the changes on the Preview Box
const previewBox = _id('preview-box');
function setPreviewBox(){
    previewBox.innerHTML = card.getAttribute('style').split('; ').join(';\n');
};

Observe(card,{
    attributesList: ["style"], 
    attributeOldValue: true,
  }, (m) => {
    previewBox.innerHTML = m.target.getAttribute(m.attributeName).split('; ').join(';\n');
});

// Copy Styles to Clipboard
function copyToClipboard(){
    previewBox.select();
    previewBox.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(previewBox.value).then(() => {
        alert('Text copied to clipboard!');
    })
}