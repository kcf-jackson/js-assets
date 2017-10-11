// Javascript template
window.onload = function init() {
    var project = new workspace();
    project.run();
}

function workspace() {
    inputStates = {};
    X = cbind(runif(20), runif(20));
    y = rbern(20, 0.5);
    canvas = document.getElementById("test");
    canvasScale = getScales(X, canvas, rep(0, 4));
    X1 = applyScale(X, canvasScale);
    gridData = createGridData([100, 100],  canvas);
    function begin() {
        // initialisation codes usually goes here.
        // add window listener - keyboard and/or mouse
        // add canvas listener - keyboard and/or mouse
        
        // Project specific codes
        addKeyboardControl();
        addMouseControl("test");
        //
        
        requestAnimationFrame(mainLoop);
    }
    function mainLoop() {
        clearCanvas(canvas);
        // Draw grids
        gridColors = gridData.grid.map(x => y[knn(x, X1)]);
        drawGrid(gridData, canvas, gridColors);
        // Draw datapoints
        canvasScale = getScales(X, canvas, rep(0, 4));
        X1 = applyScale(X, canvasScale);
        drawPoints(X1, canvas, undefined, undefined, 
                   catColorScale(y, ["Darkblue", "DarkRed"]));
        respond_to_IO();
        requestAnimationFrame(mainLoop);
    }
    
    return {
        run: begin  //external name: internal name
    }
}

function respond_to_IO() {
//    if (inputStates.mousedown) {
//        data0.push([runif(1), runif(1), rbern(1)])
//    }
}

