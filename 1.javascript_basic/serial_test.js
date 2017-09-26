function a(cb) {
    setTimeout(function() {
        console.log('111');
        if (cb) cb();
    }, 1000);
}

function b(cb) {
    setTimeout(function() {
        console.log('222');
        if (cb) cb();
    }, 500);
}

function c(cb) {
    setTimeout(function() {
        console.log('333');
        if (cb) cb();
    }, 1500);
}

function d(cb) {
    setTimeout(function() {
        console.log('444');
        if (cb) cb();
    }, 1000);
}

function not_good() {
    // not working
    array = [a, b, c, d];
    for (var i = 0; i < array.length; i++) {
        console.log(i);
        //array[i]();
    }
}

a(function() {
    b();
});

a(function() {
    b(function() {
        c();
    })
});

a(function() {
    b(function() {
        c(function() {
            d();
        });
    });
});
