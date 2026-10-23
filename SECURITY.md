# Security update (2026-10-23)

Use Node.js 24.22.1 or a later patched 24.x release (`.nvmrc`, `engines.node`).
Vercel manages patches for its selected 24.x runtime; merging this change still
requires a new production deployment and verification of that deployment.

Next.js 16.4.2 includes the October 14 upstream security fixes. React and React DOM
are 19.3.1. The lockfile includes sharp 0.35.5 or later. Async route parameters,
React types, and ESLint CLI configuration have been migrated without changing
page content or layout. The `postcss-selector-parser` override applies the fix for
GHSA-rj75-hqrm-r3gf while retaining Tailwind 3 and its existing styles.

## Remaining development dependency advisory

`braces` 3.0.3 has no patched release for
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
It is reached by Tailwind 3 and the Next.js ESLint plugin through build-time file
matching tools. These tools consume repository-controlled patterns in this app.
`npm audit --omit=dev` reports zero vulnerabilities. The full audit reports six
high-severity affected packages, all tracing to this one development-only advisory.
This does not claim that the unresolved dependency is patched.

CI runs clean installation, lint, type checking, production build, and both audits.
`npm run audit` prints the full report and allows only this advisory when every
affected installed package is marked development-only in the lockfile. Any other
advisory, production finding, or audit failure fails CI. Remove the exception when
an upstream fix is available. A forced Tailwind 4 migration is deliberately outside
this security update because it can alter the site's appearance.

References:
- https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
- https://nextjs.org/blog/nextjs-security-update-october-14-2026
- https://vercel.com/kb/bulletin/node-js-security-advisory
