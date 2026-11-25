// make.fun entry: "Weirdest Job Title: Blind Judge Showdown".
// Writes one job title (plus a trailing newline) to <output dir>/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The rank: a perfectly ordinary C-suite title...
const RANK = "Chief Regret Officer";
// ...and the domain that makes it weird: owning regrets nobody human made.
const DOMAIN = "for Decisions Made by the Algorithm";

const ENTRY = `${RANK} ${DOMAIN}`;
// Pin the exact length so accidental edits to the title are caught.
const EXPECTED_CHARS = 56;

function validate(entry: string): void {
  const chars = [...entry].length;
  if (chars < 1 || chars > 60) {
    throw new Error(`entry must be 1-60 characters, got ${chars}`);
  }
  if (chars !== EXPECTED_CHARS) {
    throw new Error(`entry must be exactly ${EXPECTED_CHARS} characters, got ${chars}`);
  }
  // Any line break (including Unicode separators) or control char breaks "single line".
  if (/[\r\n\u0085\u2028\u2029\u0000-\u001f\u007f]/.test(entry)) {
    throw new Error("entry must be a single line");
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
