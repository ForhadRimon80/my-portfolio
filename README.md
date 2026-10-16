# Farhad Rimon — Portfolio with private admin statistics

A Next.js App Router portfolio with public projects and an owner-only statistics dashboard. TypeScript, React Icons, HeroUI feedback, MongoDB page-read storage, and Resend contact email.

## Run

Open the folder containing package.json:

```bash
npm ci
npm run dev
```

Visit the Local URL shown in the terminal. Public visitors can view Home, About, Projects, project details, Toolbox, Links, and Contact without signing in.

## Environment

Copy .env.example to .env.local (or .env). If transferring from an older version, copy your existing private environment file into this project root. Restart the server after changes.

| Variable | Purpose |
| --- | --- |
| SITE_URL | Your exact local/production origin; default http://localhost:3000 |
| ADMIN_TOKEN | Your private random login credential, at least 32 characters |
| MONGODB_URI | MongoDB connection URI for page reads and contact rate limiting |
| MONGODB_DB | Database name; default farhad_portfolio |
| APP_SECRET | Random secret for hashing network addresses; use at least 32 characters |
| RESEND_API_KEY | Resend key for contact email |
| EMAIL_FROM | Sender on your verified Resend domain |
| CONTACT_EMAIL | Your receiving inbox |
| NEXT_PUBLIC_BOOKING_URL | Optional external booking URL |
| GITHUB_TOKEN | Optional GitHub API token to increase its rate limit |

Generate ADMIN_TOKEN and APP_SECRET separately:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Keep your environment file private. Never prefix secrets with NEXT_PUBLIC_.

## Owner access

1. Set ADMIN_TOKEN and restart the development server.
2. Open `/admin` (or `/admin/login`).
3. Enter your ADMIN_TOKEN and sign in.
4. View GitHub followers, public repositories, estimated page reads, and project count.
5. Use Sign out when finished.

This is a single-owner secret-based login, not Better Auth or email/password registration. Anyone holding your ADMIN_TOKEN has owner access, so keep it to yourself. It is never written to localStorage or returned as a response value.

The src/proxy.ts gate redirects unauthorized requests before rendering. Authentication is also checked in the server page before reading dashboard data. Sessions use an HMAC-signed cookie that expires after eight hours, with HttpOnly, SameSite=Strict and Secure in production. Missing, altered, or expired sessions redirect to the login page. Signing out clears the browser cookie. Change ADMIN_TOKEN to invalidate all existing signed sessions. Login attempts have a bounded, per-server-process throttle; a host with multiple instances may additionally use its own shared rate limit.

There is no public statistics page or public statistics data API. The private page calls a server-only helper after authentication. Admin is intentionally absent from public navigation and sitemap; open its URL directly.

## Data

- `src/data/profile.ts`: profile, skills, social links.
- `src/data/projects.ts`: public project data.
- `src/data/tools.ts`: toolbox entries.
- `src/data/navigation.ts`: public header/footer links.
- `src/components/homePage/`: presentation sections.
- `src/components/admin/`: login form, server-rendered stats cards and logout button.
- `src/lib/adminAuth.ts`: cookie access and server admin checks.
- `src/lib/sessionToken.ts`: signed session creation and validation.
- `src/lib/adminStats.ts`: server-only dashboard data loading.
- `src/app/api/admin/login/route.ts`: owner login and cookie creation.
- `src/app/api/admin/logout/route.ts`: cookie removal.
- `src/app/api/views/route.ts`: public write-only page-read recording.
- `src/app/api/contact/route.ts`: validated contact email.

MongoDB uses `views`, `events` and `limits`. Page-read events are deduplicated per page, hashed network address, and UTC day. Detailed events expire after about 90 days; aggregate counts remain. The host must supply a trusted x-forwarded-for header. This is an estimate, not a count of unique people. Contact messages are sent through Resend, not archived in MongoDB.

The dashboard opens with ADMIN_TOKEN even if MongoDB or GitHub is unavailable; unavailable figures are shown as a dash. Page reads need MongoDB and APP_SECRET. Contact needs MongoDB, APP_SECRET, Resend configuration and CONTACT_EMAIL. Public projects do not depend on the database.

## Content and design

Project data creates cards and detail routes. Home headline/collage and About copy are in their components/pages and are edited separately. GitHub statistics still use the profile URL in `src/lib/adminStats.ts`; update that URL if changing accounts. Design tokens and responsive styles are in `src/app/globals.css`.

## Verification and hosting

```bash
npm test
npm run typecheck
npm run build
npm start
```

Deploy to a Node-compatible Next.js host with HTTPS and set your environment values there. This is a server application, not a static HTML export. No CMS, visitor account registration, billing, or external calendar engine is included. See VERIFICATION.md for checks completed and limitations. The earlier PDF describes older file locations; use STRUCTURE.md for this version.
