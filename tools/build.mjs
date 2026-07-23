import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "dist");
const requiredFiles = ["index.html", "styles.css", "game.js"];

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const file of requiredFiles) {
  await cp(resolve(projectRoot, file), resolve(outputRoot, file));
}
await cp(resolve(projectRoot, "assets"), resolve(outputRoot, "assets"), { recursive: true });

const rootEntries = await readdir(outputRoot);
for (const required of [...requiredFiles, "assets"]) {
  if (!rootEntries.includes(required)) throw new Error(`Missing build artifact: ${required}`);
}

const assetStats = await stat(resolve(outputRoot, "assets", "chapter1_blackwood"));
if (!assetStats.isDirectory()) throw new Error("Chapter 1 assets were not copied");

console.log(`Clean static build created: ${outputRoot}`);
