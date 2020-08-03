/**
 * 窗口大小发生改变时按比例重置某个元素的大小
 * @param {string} resetObjName -缩放元素的DOM名称，包含选择符
 * @param {number} horizontalPx -控制水平方向上缩放比例的像素值
 * @param {number} verticalPx -控制垂直方向上缩放比例的像素值
 */
export const resetSize = (resetObjName, horizontalPx, verticalPx) => {
  const XZoom = window.innerWidth / horizontalPx;
  const yZoom = window.innerHeight / verticalPx;
  const resetSizeObj = document.querySelector(resetObjName);
  resetSizeObj.style.transform = `scaleX(${XZoom}) scaleY(${yZoom})`;
  console.log(resetObjName, horizontalPx, verticalPx);
};

export default {
  resetSize,
};
