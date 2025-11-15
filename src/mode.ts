import { PackageRequirement } from "libpkgx";

const validModes = ["strict", "loose", "any"] as const;
export type Mode = typeof validModes[number];

export function parseMode(mode: any): Mode {
  if (!validModes.includes(mode)) {
    console.error(
      `Error: --mode should be one of the: ${
        validModes.join(", ")
      } (default: any)`,
    );
    Deno.exit(1);
  }
  return mode as Mode;
}

export function modePredicate(mode: Mode = "any") {
  switch (mode) {
    case "any":
      return (pkg: PackageRequirement) => !!pkg;
    case "strict":
      return (pkg: PackageRequirement) =>
        pkg.constraint.toString()?.startsWith("@");
    case "loose":
      return (pkg: PackageRequirement) => pkg.constraint.toString() !== "*";
  }
}
