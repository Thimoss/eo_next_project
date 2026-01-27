import fs from "node:fs";

const suspiciousPaths = [
  "/dev/lrt",
  "/dev/shm/lrt",
  "/var/lrt",
  "/etc/lrt",
  "/lrt",
  "/tmp/lrt",
];

function safeExists(path: string): boolean {
  try {
    return fs.existsSync(path);
  } catch {
    return false;
  }
}

export async function register() {
  const nodeOptions = process.env.NODE_OPTIONS ?? "";
  const nodePath = process.env.NODE_PATH ?? "";
  const ldPreload = process.env.LD_PRELOAD ?? "";
  const execArgv = process.execArgv.join(" ");

  const hasRequireLikeArgs =
    /\s(--require|-r)\s/.test(` ${execArgv} `) ||
    /\s(--require|-r)\s/.test(` ${nodeOptions} `);

  const foundSuspiciousFiles = suspiciousPaths.filter(safeExists);

  if (ldPreload || nodePath || hasRequireLikeArgs) {
    console.warn("[startup] Suspicious runtime configuration detected", {
      hasRequireLikeArgs,
      NODE_OPTIONS: nodeOptions,
      NODE_PATH: nodePath,
      LD_PRELOAD: ldPreload,
      execArgv: process.execArgv,
    });
  }

  if (foundSuspiciousFiles.length > 0) {
    console.warn("[startup] Suspicious paths exist on disk", {
      paths: foundSuspiciousFiles,
    });
  }
}

