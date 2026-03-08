export function canvasToBitmapBytes(source: HTMLCanvasElement): Uint8Array {
  const off = document.createElement("canvas");
  off.width = 256;
  off.height = 64; // assuming no rotation
  const ctx = off.getContext("2d")!;
  ctx.fillStyle = "#ffffff"; // so that transparent pixels become white
  ctx.fillRect(0, 0, 256, 64);
  ctx.drawImage(source, 0, 0, 256, 64);

  const { data } = ctx.getImageData(0, 0, 256, 64);
  const bytes = new Uint8Array(256 * 64);
  for (let i = 0; i < bytes.length; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    bytes[i] = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }
  return bytes;
}
