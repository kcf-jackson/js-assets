// myCanvas.js
function drawPoints(data0, canvas, size = 5, filled = true, colors) {
    var ctx = canvas.getContext('2d');
    var n = data0.length;
    for (var i = 0; i < n; i++) {
        // The circle is drawn using the 'arc' method of canvas.
        // Usage: context.arc(x, y, r, sAngle, eAngle, counterclockwise);
        var pt = data0[i]; 
        ctx.beginPath();   
        ctx.arc(pt[0], pt[1], size, 0, 2*Math.PI);
        if (colors) {
            ctx.fillStyle = colors[i];
            ctx.strokeStyle = colors[i];
        }
        if (filled) { ctx.fill(); }
        ctx.stroke();
        ctx.closePath();
        resetColors(ctx);
    }
}

function resetColors(ctx) {
    ctx.fillStyle = undefined;
    ctx.strokeStyle = undefined;
}

// Functions for drawing grid
function createGridData(gridDim, canvas) {
    var numVerticalBox = gridDim[0];
    var numHorizontalBox = gridDim[1];
    var w = canvas.width;
    var h = canvas.height;
    var wDivider = seq(0, w, null, numHorizontalBox + 1);
    var hDivider = seq(0, h, null, numVerticalBox + 1);
    
    var gridData = [];
    for (var i = 0; i < wDivider.length - 1; i++) {
        for (var j = 0; j < hDivider.length - 1; j++) {
            gridData.push([wDivider[i], hDivider[j]]);
        }
    }
    
    var boxWidth = wDivider[1] - wDivider[0];
    var boxHeight = hDivider[1] - hDivider[0];
    return {grid: gridData, boxWidth: boxWidth, boxHeight: boxHeight};
}

function drawGrid(gridData, canvas, colors){
    var gd = gridData.grid;
    var bw = gridData.boxWidth;
    var bh = gridData.boxHeight;
    var ctx = canvas.getContext('2d');
    
    for (var i = 0; i < gd.length; i++) {
        var pt = gd[i];
        ctx.beginPath();
        if (colors[i] < 0.5) {
            ctx.fillStyle="lightblue"; 
            ctx.strokeStyle="lightblue"; 
        } else {
            ctx.fillStyle="LightCoral"; 
            ctx.strokeStyle="LightCoral"; 
        }
        ctx.rect(pt[0],pt[1],bw,bh);
        ctx.stroke();     
        ctx.fill();
        ctx.closePath;    
    }   
    
}

function catColorScale(y, colorRange) {
    catScale = d3.scaleOrdinal()
                .domain(d3.extent(y))
                .range(colorRange);
    return y.map(catScale);
}

// Functions for scaling data to canvas size and the other way around.
function getScales(data0, canvas, margins = [40, 40, 40, 40]) {
    data0 = t(data0);
    var scale = function(data0, target_range) {
        //Input: data0; a 1 x n array; target_range; a pair of numbers. 
        return canvas_scale = d3.scaleLinear().domain(d3.extent(data0)).range(target_range);
    }

    var h = canvas.height;
    var w = canvas.width;
    var width_range = [margins[0], w - margins[2]];
    var height_range = [margins[1], h - margins[3]];
    
    var scaleX = scale(data0[0], width_range);
    var scaleY = scale(data0[1], height_range);
    return [scaleX, scaleY];
}

function applyScale(data0, listOfScales) { 
    if (!data0[0].length) {
        return map2(data0, listOfScales, (x,y) => y(x));
    }
    return t(map2(t(data0), listOfScales, (x,y) => map(x, y)));
}

function applyInverseScale(data0, listOfScales) { 
    if (!data0[0].length) {
        return map2(data0, listOfScales, (x,y) => y.invert(x));
    }
    return t(map2(t(data0), listOfScales, (x,y) => map(x, y.invert)));
}

// Clear canvas
function clearCanvas(canvas) {
    var w = canvas.width;
    var h = canvas.height;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
}
