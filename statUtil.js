// statUtil.js
function l2_norm(vec0) {
    return Math.sqrt(sum(vec0.map(x => x ** 2)));
}

function rbern(n, p = 0.5) {
    return runif(n).map(x => (x > p) ? 0 : 1);
}

function logit(x) { 
    return Math.log(x / 1 - x);
}

function inverse_logit(x) {
    var ex = Math.exp(x);
    return ex / (1 + ex);
}

function knn(x0, X) {
    //this function returns the index of the nearest entry
    var dist = [];
    var min_dist_index = undefined;
    var min_dist = undefined;
    for (var i = 0; i < X.length; i++) {
        var d = l2_norm(map2(x0, X[i], (x, y) => (x - y)));
        dist.push(d);
        if (!min_dist) {
            min_dist = dist[0];
            min_dist_index = 0;
            //console.log("initialised");
        } else {
            if (dist[i] < min_dist) {
                min_dist = dist[i];
                min_dist_index = i;
                //console.log("updated");
            }   
        }
    }
    return min_dist_index;
}

function multiply(A, B) {
    // matrix [1 2; 3 4] should be [[1,2],[3,4]]
	if (ncol(A) != nrow(B)) {
		throw("The dimension of the matrices do not match.")
	}
    var C = t(B);
	var numRow = nrow(A);
    var numCol = ncol(B);
    var res = [];
    for (var i = 0; i < numRow; i++) {
        var rowVec = [];
        for (var j = 0; j < numCol; j++) {
            rowVec.push(inner_product(A[i], C[j]))
        }
        res.push(rowVec);
    }
    return res;
}

function inner_product(v0, v1) {
    return sum(map2(v0, v1, (x,y) => x*y));
}

function random_matrix(n, m, randFun = runif, ...args) {
	var res = [];
	for (var i = 0; i < n; i++) {
		res.push(randFun(m, ...args));
	}
	return res;
}
