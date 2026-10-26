// Uso: node render.js <anuncio.html> <saida.mp4> [fps]
// Também: node render.js <anuncio.html> <prefixo> --stills t1,t2,... (gera PNGs para conferência)
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");
(async () => {
  const [, , page_, out, arg3] = process.argv;
  const stills = process.argv.includes("--stills") ? process.argv[process.argv.indexOf("--stills") + 1].split(",").map(Number) : null;
  const fps = stills ? 30 : Number(arg3 || 30);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto("file://" + path.resolve(page_) + "?render=1", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => Promise.all(["600 40px Lora", "700 40px Lora", "400 40px Inter", "500 40px Inter", "600 40px Inter", "700 40px Inter"].map((f) => document.fonts.load(f))));
  await page.waitForFunction(() => window.__tl && document.fonts.status === "loaded");
  await page.evaluate(() => document.fonts.ready);
  const dur = await page.evaluate(() => window.__duration);
  if (stills) {
    for (const t of stills) { await page.evaluate((t) => { window.__tl.seek(t, false); }, t); await page.screenshot({ path: `${out}-${t}s.png` }); }
  } else {
    const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
    const n = Math.round(dur * fps);
    for (let i = 0; i < n; i++) {
      await page.evaluate((t) => { window.__tl.seek(t, false); }, i / fps);
      ff.stdin.write(await page.screenshot({ type: "jpeg", quality: 92 }));
    }
    ff.stdin.end();
    await new Promise((r) => ff.on("close", r));
  }
  await browser.close();
  console.log("ok", out, dur + "s");
})();
