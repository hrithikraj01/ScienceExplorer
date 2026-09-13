const sharp = require("sharp");
const fs = require("fs");

const src =
  "C:/Users/soura/.cursor/projects/c-Users-soura-OneDrive-Desktop-science-explorers/assets/c__Users_soura_AppData_Roaming_Cursor_User_workspaceStorage_816ab4c7b954052dd7f99584944e0c2d_images_image-f5156623-1fbc-452a-be8d-9c2ff18f81b3.png";

(async () => {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const px = (x, y) => (y * width + x) * 4;
  const isNearBlack = (i) => data[i] < 30 && data[i + 1] < 30 && data[i + 2] < 30;

  const visited = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    if (!isNearBlack(idx * 4)) return;
    visited[idx] = 1;
    stack.push(idx);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const idx = stack.pop();
    const x = idx % width;
    const y = (idx / width) | 0;
    const i = idx * 4;
    data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  const copy = Buffer.from(data);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = px(x, y);
      if (copy[i + 3] === 0) continue;
      let nearT = false;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        if (copy[px(x + dx, y + dy) + 3] === 0) {
          nearT = true;
          break;
        }
      }
      if (nearT && isNearBlack(i)) data[i + 3] = 0;
    }
  }

  const rgba = await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer();

  const trimmed = await sharp(rgba).trim({ threshold: 5 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const side = Math.max(meta.width, meta.height);
  const padded = await sharp(trimmed)
    .extend({
      top: Math.floor((side - meta.height) / 2),
      bottom: Math.ceil((side - meta.height) / 2),
      left: Math.floor((side - meta.width) / 2),
      right: Math.ceil((side - meta.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(1024, 1024)
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.mkdirSync("public/media", { recursive: true });
  fs.mkdirSync("app", { recursive: true });
  fs.writeFileSync("public/media/logo.png", padded);

  await sharp(padded).resize(180, 180).png().toFile("app/apple-icon.png");
  await sharp(padded)
    .extract({ left: 300, top: 280, width: 424, height: 424 })
    .resize(64, 64)
    .png()
    .toFile("app/icon.png");
  await sharp(padded).resize(32, 32).png().toFile("public/media/favicon-32.png");

  console.log("logo bytes", padded.length);
  console.log("done");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
