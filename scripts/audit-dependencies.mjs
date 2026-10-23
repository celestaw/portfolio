import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Only this unpublished development-tool fix is temporarily excepted.
// Production dependencies and any other advisory must still fail CI.
const exception = "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm";
const result = spawnSync(process.execPath, [process.env.npm_execpath, "audit", "--json"], {
  encoding: "utf8",
  maxBuffer: 16 * 1024 * 1024,
});
if (result.error || ![0, 1].includes(result.status)) {
  throw result.error ?? new Error(result.stderr || "npm audit did not complete");
}
const report = JSON.parse(result.stdout);
if (report.error || !report.vulnerabilities) {
  throw new Error(JSON.stringify(report.error ?? "Invalid npm audit report"));
}
const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));
const findings = Object.values(report.vulnerabilities);
const advisories = findings.flatMap(finding => finding.via.filter(via => typeof via === "object"));
const onlyKnownDevelopmentIssue = findings.every(finding =>
  finding.nodes.length > 0 && finding.nodes.every(node => lock.packages[node]?.dev === true)
) && advisories.length > 0 && advisories.every(advisory => advisory.url === exception);
console.log(result.stdout);
if (findings.length > 0 && !onlyKnownDevelopmentIssue) {
  process.exitCode = 1;
} else if (findings.length > 0) {
  console.warn(`Known development-only braces advisory remains (${findings.length} affected packages): ${exception}`);
}
