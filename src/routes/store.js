import { writable } from 'svelte/store';
const sachpaint = [
    { Ten: 'TPR100V', Trang: 32 },
    { Ten: 'TPR101V', Trang: 42 },
    { Ten: 'TPR102V', Trang: 22 },
    { Ten: 'TPR103V', Trang: 30 },
    { Ten: 'TPR104V', Trang: 38 },
    { Ten: 'TPR105V', Trang: 34 },
    { Ten: 'TPR106V', Trang: 58 },
    { Ten: 'TPR107V', Trang: 26 },
    { Ten: 'TPR108V', Trang: 22 }
];
const sachbody = [
    { Ten: 'TPR100V', Trang: 32 },
   
];
export const KTV = writable("none");
export const BoPhan = writable("none");
export const TienDo = writable("none");
export const TenSach = writable("none");
export const TrangDangHoc = writable("none");
export const id = writable("none");
export const Job = writable("none");
export const ThoiGianHoc =writable(0)
export const SachPaint =writable(sachpaint)
export const SachBody =writable(sachbody)