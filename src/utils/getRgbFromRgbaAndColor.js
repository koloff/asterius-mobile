import Color from 'color';

export default function getRgbFromRgbaAndColor(color1, color2Arr) {
  let c1 = new Color(color1).array();
  let c2 = color2Arr;
  // let r3 = r2 + (r1-r2)*a1
  // let g3 = g2 + (g1-g2)*a1
  // let b3 = b2 + (b1-b2)*a1
  let r3 = c2[0] + (c1[0] - c2[0]) * c1[3];
  let g3 = c2[1] + (c1[1] - c2[1]) * c1[3];
  let b3 = c2[2] + (c1[2] - c2[2]) * c1[3];
  return new Color([r3, g3, b3]).string();
}