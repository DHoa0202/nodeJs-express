const x = 10; // lãi xuất

// y: von, n: lai
function lai_kep(y, n) { // y: von + lai cu
    const p = y * x / 100; // tien lai
    console.log(p);
    if (--n > 0) return lai_kep(y + p, n);
    return p + y;
}

console.log(lai_kep(1000, 3));
