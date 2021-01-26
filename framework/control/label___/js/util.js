var Util = {};

Util.inPolygon = function (x, y, points) {
    let tf = false;
    let n, count = points.length;
    let A, B;

    for (let m = 0; m < count; m++) {
        n = (m == count - 1 ? 0 : m + 1);
        A = points[m];
        B = points[n];

        ((A.y <= y && y < B.y) || (B.y <= y && y < A.y))
            && (x < (B.x - A.x) * (y - A.y) / (B.y - A.y) + A.x)
            && (tf = !tf);
    }
    return tf;
}

Util.getLengthByPoint = function (p1, p2) {
    return Math.sqrt(Math.pow(Math.abs(p1.x - p2.x), 2) + Math.pow(Math.abs(p1.y - p2.y), 2));
}

Util.getTriangleAreaByPoint = function (p1, p2, p3) {
    let s, p;
    let a = Util.getLengthByPoint(p1, p2);
    let b = Util.getLengthByPoint(p1, p3);
    let c = Util.getLengthByPoint(p2, p3);

    if (a + b == c || a + c == b || b + c == a) {
        return 0;   // -- the three points are on the same line --
    }

    p = (a + b + c) / 2;
    s = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    return s;
}
Util.getTriangleHeight = function (p1, p2, p3) {
    let a, s, h;

    a = Util.getLengthByPoint(p1, p2);
    s = Util.getTriangleAreaByPoint(p1, p2, p3);
    h = 2 * s / a;
    return h;
}