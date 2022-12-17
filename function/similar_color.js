
function rgb2hex(a, r, t) {
 var c2h = function (a) {
  var r = a.toString(16);
  return 1 == r.length ? "0" + r : r;
 }
 return "#" + c2h(a) + c2h(r) + c2h(t);
}

function hex2rgb(a) {
 var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
 return r
  ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }
  : null;
}

function rgb2hsv(a, r, t) {
 let o, h, n, M, e, s, u, m, d, f, l, c;
 return (
  (o = a / 255),
  (h = r / 255),
  (n = t / 255),
  (d = Math.max(o, h, n)),
  (l = (a) => (d - a) / 6 / f + 0.5),
  (c = (a) => Math.round(100 * a) / 100),
  0 == (f = d - Math.min(o, h, n))
   ? (u = m = 0)
   : ((m = f / d),
    (M = l(o)),
    (e = l(h)),
    (s = l(n)),
    o === d
     ? (u = s - e)
     : h === d
      ? (u = 1 / 3 + M - s)
      : n === d && (u = 2 / 3 + e - M),
    u < 0 ? (u += 1) : u > 1 && (u -= 1)),
  {
   h: Math.round(360 * u),
   s: c(100 * m),
   v: c(100 * d)
  }
 );
}

function hsv2rgb(a, r, t) {
 var o, h, n, M, e, s, u, m;
 if (
  ((a = Math.max(0, Math.min(360, a))),
   (r = Math.max(0, Math.min(100, r))),
   (t = Math.max(0, Math.min(100, t))),
   (t /= 100),
   0 == (r /= 100))
 )
  return (
   (o = h = n = t),
   [Math.round(255 * o), Math.round(255 * h), Math.round(255 * n)]
  );
 switch (
 ((s = t * (1 - r)),
  (u = t * (1 - r * (e = (a /= 60) - (M = fl(a))))),
  (m = t * (1 - r * (1 - e))),
  M)
 ) {
  case 0:
   (o = t), (h = m), (n = s);
   break;
  case 1:
   (o = u), (h = t), (n = s);
   break;
  case 2:
   (o = s), (h = t), (n = m);
   break;
  case 3:
   (o = s), (h = u), (n = t);
   break;
  case 4:
   (o = m), (h = s), (n = t);
   break;
  default:
   (o = t), (h = s), (n = u);
 }
 return [Math.round(255 * o), Math.round(255 * h), Math.round(255 * n)];
}
function fl(n) {
 return Math.floor(n)
}
function rd() {
 return Math.random()
}
function similarColor(hex, similarity) {
 var source_color_rgb = hex2rgb(hex)
 var source_color_hsv = rgb2hsv(source_color_rgb.r, source_color_rgb.g, source_color_rgb.b)
 var color_a_h, color_a_s, color_a_v = 0
 var color_b_h, color_b_s, color_b_v = 0
 if (source_color_hsv.h < similarity) {
  color_a_h = source_color_hsv.h + fl(rd() * similarity)
  color_b_h = source_color_hsv.h + fl(rd() * similarity)
 }
 if (source_color_hsv.h > similarity && source_color_hsv.h < (360 - similarity)) {
  color_a_h = source_color_hsv.h + fl((0 - similarity) + rd() * (similarity * 2))
  color_b_h = source_color_hsv.h + fl((0 - similarity) + rd() * (similarity * 2))
 }
 if (source_color_hsv.h > (360 - similarity)) {
  color_a_h = source_color_hsv.h - fl(rd() * similarity)
  color_b_h = source_color_hsv.h - fl(rd() * similarity)
 }
 if (source_color_hsv.s < similarity) {
  color_a_s = source_color_hsv.s + fl(rd() * similarity)
  color_b_s = source_color_hsv.s + fl(rd() * similarity)
 }
 if (source_color_hsv.s > similarity && source_color_hsv.s < (100 - similarity)) {
  color_a_s = source_color_hsv.s + fl((0 - similarity) + rd() * (similarity * 2))
  color_b_s = source_color_hsv.s + fl((0 - similarity) + rd() * (similarity * 2))
 }
 if (source_color_hsv.s > (100 - similarity)) {
  color_a_s = source_color_hsv.s - fl(rd() * similarity)
  color_b_s = source_color_hsv.s - fl(rd() * similarity)
 }

 if (source_color_hsv.v < similarity) {
  color_a_v = source_color_hsv.v + fl(rd() * similarity)
  color_b_v = source_color_hsv.v + fl(rd() * similarity)
 }
 if (source_color_hsv.v > similarity && source_color_hsv.v < (100 - similarity)) {
  color_a_v = source_color_hsv.v + fl((0 - similarity) + rd() * (similarity * 2))
  color_b_v = source_color_hsv.v + fl((0 - similarity) + rd() * (similarity * 2))
 }
 if (source_color_hsv.v > (100 - similarity)) {
  color_a_v = source_color_hsv.v - fl(rd() * similarity)
  color_b_v = source_color_hsv.v - fl(rd() * similarity)
 }
 var color_a_rgb = hsv2rgb(color_a_h, color_a_s, color_a_v)
 var color_b_rgb = hsv2rgb(color_b_h, color_b_s, color_b_v)

 var color_a_hex = rgb2hex(color_a_rgb[0], color_a_rgb[1], color_a_rgb[2])
 var color_b_hex = rgb2hex(color_b_rgb[0], color_b_rgb[1], color_b_rgb[2])
 return [color_a_hex, color_b_hex]
}

function colorScale(hex, amount, similarity) {
 var amount_n = amount
 if (amount <= 0) {
  amount_n = 2
 }
 if (!(amount % 2 === 0)) {
  amount_n = amount + 1
 }
 var l = amount_n / 2
 var list = []
 for (var i = 0; i < l; i++) {
  var source_color
  if (i === 0) {
   source_color = hex
  }
  else {
   source_color = list[list.length - 1]
  }
  list = list.concat(similarColor(source_color,similarity))
 }
 return list
}