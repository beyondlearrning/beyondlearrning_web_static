import { existsSync } from "node:fs";
import path from "node:path";

type PhotoSlot = {
  /** Folder inside `public/`, e.g. `images/home`. */
  directory: string;
  /** File name without extension. */
  fileName: string;
  /** Extensions to look for, in priority order. */
  extensions: readonly string[];
};

/**
 * Looks for an approved local photograph in `public/`. Returns its public URL,
 * or null when no file has been added yet (callers then show a placeholder).
 * Server-only: it reads the file system at build/render time.
 */
export function findLocalPhoto({
  directory,
  fileName,
  extensions,
}: PhotoSlot): string | null {
  for (const extension of extensions) {
    const file = `${fileName}.${extension}`;
    if (existsSync(path.join(process.cwd(), "public", directory, file))) {
      return `/${directory}/${file}`;
    }
  }

  return null;
}
