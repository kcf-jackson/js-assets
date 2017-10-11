// Mouse event listeners
function addMouseControl(canvas_id) {
    var canvas = document.getElementById(canvas_id);
    canvas.addEventListener('mousemove', eventMouseMove, false);
    canvas.addEventListener('mousedown', eventMouseDown, false);
    canvas.addEventListener('mouseup', eventMouseUp, false);    
    canvas.addEventListener('click', eventMouseClick, false);    
}

// Mouse event functions
function getMousePos(canvas, evt) {
    // necessary to take into account CSS boudaries
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Keyboard event listeners
function addKeyboardControl() {
    window.addEventListener('keydown', eventKeyDown, false);
    window.addEventListener('keyup', eventKeyUp, false);
}

// Projects based codes
// Mouse events
function eventMouseMove(evt) {
    //console.log(getMousePos(this, evt));
}

function eventMouseUp(evt) {}

function eventMouseDown(evt) {}

function eventMouseClick(evt) {
    console.log("Mouse click registered.")
    //X.push([runif(1), runif(1)]);
    var mousePos = getMousePos(this, evt);
    var canvasPt = [mousePos.x, mousePos.y];
    var newDataPoint = applyInverseScale(canvasPt, canvasScale);
    //console.log(newDataPoint);
    X.push(newDataPoint);
    if (inputStates.shift) {
        console.log("1");
        y.push(1);    
    } else {
        console.log("0");
        y.push(0);
    }
}

// Keyboard events
function eventKeyDown(evt) {
    if (evt.keyCode === 16) {
        console.log("shift key is pressed.")
        inputStates.shift = true;
    }
}

function eventKeyUp(evt) {
    inputStates.shift = false;
}