<div align="center">

# Farhad Rimon | Portfolio

A personal portfolio built with Next.js, React, and TypeScript.

Explore my projects, discover the tools I work with, and get in touch.

[GitHub](https://github.com/ForhadRimon80) · [LinkedIn](https://www.linkedin.com/in/farhad-rimon-7487b5201/)

</div>

---

## Overview

This portfolio brings together my projects, skills, and professional links in a responsive interface with light and dark themes. Visitors can explore everything publicly, while a private admin dashboard gives the owner access to website and GitHub statistics.

## Features

- **Home:** Profile photo, introduction, project highlights, and skills.
- **About:** Background, interests, and development approach.
- **Projects:** Search, filter by project type, and explore individual project details and source links.
- **Toolbox:** Search development tools and filter by category.
- **Contact:** Validated contact form with email delivery, plus LinkedIn and GitHub buttons.
- **Navigation search:** Search public page links using the search button or `Ctrl/Cmd + K`.
- **Theme switching:** Light and dark modes with a saved browser preference.
- **Responsive layouts:** Mobile, tablet, and desktop styles.
- **Private statistics:** Owner token login, GitHub followers, public repository count, estimated page reads, and portfolio project count.
- **Session management:** Signed admin session cookie and sign out.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js App Router | Pages, server rendering, and API Route Handlers |
| React and TypeScript | Components, interactive state, and type checking |
| Tailwind CSS and custom CSS | Layouts, design tokens, and responsive styles |
| React Icons | Interface icons |
| HeroUI | Success and error toast feedback |
| MongoDB | Page-read counters, deduplication events, and contact rate limits |
| Resend | Contact email delivery |
| Zod | Server-side input validation |
| Node.js | Server runtime, cryptography, and test runner |

Express.js appears in the Toolbox skills list, but this application's API uses Next.js Route Handlers. Express is not a project dependency.

## Getting Started

Use Node.js 24 LTS and npm. Open a terminal in the extracted project folder containing `package.json` and `package-lock.json`.

```bash
npm ci
```

Create `.env.local` from `.env.example`, fill in the required values, and start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), or the local address printed in the terminal. Restart the development server after changing environment values.

## Environment Variables

Store these values in `.env.local` or `.env` in the project root. Keep real credentials out of Git.

```env
SITE_URL=http://localhost:3000
MONGODB_URI=
MONGODB_DB=My_portfolio
APP_SECRET=
ADMIN_TOKEN=
RESEND_API_KEY=
EMAIL_FROM=
CONTACT_EMAIL=
GITHUB_TOKEN=
```

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Exact website origin for metadata, sitemap, and request-origin checks |
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB` | Database name; template uses `My_portfolio`, code falls back to `farhad_portfolio` if unset |
| `APP_SECRET` | Random secret used to hash network addresses for page reads and contact limits |
| `ADMIN_TOKEN` | Private owner login credential; at least 32 characters |
| `RESEND_API_KEY` | Resend credential for contact email |
| `EMAIL_FROM` | Sender address accepted by your Resend account |
| `CONTACT_EMAIL` | Inbox that receives contact messages |
| `GITHUB_TOKEN` | Optional GitHub API credential for statistics requests |

Run this command twice to generate separate values for `APP_SECRET` and `ADMIN_TOKEN`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Public project pages work without MongoDB. Page-read tracking needs MongoDB and `APP_SECRET`. Contact email needs those values plus the Resend configuration and `CONTACT_EMAIL`.

Booking has been removed, so `NEXT_PUBLIC_BOOKING_URL` is not needed.

## Admin Access

1. Configure `ADMIN_TOKEN` and restart the server.
2. Click the footer copyright text or open `/admin`.
3. Enter the token on the login form.
4. View the private statistics dashboard.
5. Click **Sign out** when finished.

After login, a **Stats** link appears below Contact in the footer. It is hidden when the session is invalid or signed out. The dashboard also checks authentication on the server; hiding a link is not the access-control mechanism.

The owner login uses a private token rather than Better Auth or email/password registration. Sessions expire after eight hours. Cookies are HttpOnly, use SameSite=Strict, and use Secure in production. Changing `ADMIN_TOKEN` invalidates existing sessions.

Login attempts are limited per server process. Contact request limits are stored separately in MongoDB.

## Contact and Statistics

### Contact

The contact form submits to `POST /api/contact`. The server validates the input, checks a hidden spam field, applies an hourly request limit, escapes HTML, and sends the message through Resend.

Messages go to `CONTACT_EMAIL`; the visitor's address is used as `replyTo`. Contact messages are not archived in MongoDB.

### Statistics

- GitHub data comes from the account URL in `src/lib/adminStats.ts`, with a one-hour revalidation setting.
- Portfolio project count comes from `src/data/projects.ts`.
- Page reads come from MongoDB aggregate counters.
- Unavailable GitHub or database figures display a dash.

Page reads are estimates, not unique people. Events are deduplicated by page, hashed network address, and UTC day. Detailed events expire after approximately 90 days; aggregate counters remain. Tracking runs from the shared layout and does not currently exclude admin paths.

MongoDB collections:

| Collection | Purpose |
| --- | --- |
| `views` | Aggregate page-read counts |
| `events` | Daily page-read deduplication with expiry |
| `limits` | Contact request counts with expiry |

## Project Structure

```text
public/
  images/profile.jpg          Home profile photo
src/
  app/
    layout.tsx                Shared layout, metadata, font, and providers
    globals.css               Design tokens and responsive styles
    page.tsx                  Home page
    about/                    About page
    projects/                 Project list and [slug] detail page
    toolbox/                  Toolbox page
    links/                    Links page
    contact/                  Contact page
    admin/                    Private stats and login pages
    api/
      admin/login/            Token validation and session creation
      admin/logout/           Session cookie removal
      contact/                Contact email endpoint
      views/                  Page-read recording endpoint
    robots.ts                 Crawler instructions
    sitemap.ts                Public sitemap
  components/
    header/                   Navigation, search dialog, and theme toggle
    homePage/                 Banner, about cards, and featured projects
    projects/                 Project cards and search/filter list
    toolbox/                  Tool cards and search/filter list
    contact/                  Contact form
    admin/                    Login, stats cards, and sign out
    common/                   Shared headings, filters, and utilities
    providers/                Toast provider
    stats/                    Page-read tracker
    Footer.tsx                Footer and session-aware Stats link
  data/                       Profile, projects, tools, and navigation
  lib/                        Database, email, validation, auth, and helpers
  proxy.ts                    Admin route session gate
tests/                        Session and validation tests
```

## Customization

| Change | File |
| --- | --- |
| Bio, skills, and social links | `src/data/profile.ts` |
| Add or edit projects | `src/data/projects.ts` |
| Add or edit toolbox entries | `src/data/tools.ts` |
| Public navigation links | `src/data/navigation.ts` |
| Home headline and collage cards | `src/components/homePage/Banner.tsx` |
| Home bento cards | `src/components/homePage/AboutSection.tsx` |
| About page copy | `src/app/about/page.tsx` |
| Profile photo | `public/images/profile.jpg` |
| Contact layout and direct links | `src/app/contact/page.tsx` |
| Contact form fields | `src/components/contact/ContactForm.tsx` |
| Footer copy and admin entry | `src/components/Footer.tsx` |
| GitHub statistics account | `src/lib/adminStats.ts` |
| Colors, spacing, and responsive layout | `src/app/globals.css` |
| Default SEO title and description | `src/app/layout.tsx` |

Adding a project to the data array updates the project list, detail-route data, featured list, project count, and sitemap entries. Home collage content is separate and must be edited manually. Project previews are CSS illustrations, with project-specific conditions in `ProjectCard.tsx`.

Changing the profile GitHub link does not change the hardcoded statistics API URL; update both when switching accounts.

## Responsive Design

| Screen | Width | Layout |
| --- | --- | --- |
| Mobile | Below 640px | Single-column cards, stacked hero collage, and full-width hero buttons |
| Tablet | 640-1023px | Two-column listings, collapsible navigation, and stacked detail sections |
| Desktop | 1024px and above | Original desktop base values and layouts |

Additional rules below 360px reduce gutters for small phones. Touch controls, input text sizes, wrapping, and the command dialog are adapted for smaller screens.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run the production build |
| `npm run typecheck` | Check TypeScript types |
| `npm test` | Run session and validation tests |

The responsive update passed the production build, seven automated tests, CSS parsing, and a comparison confirming the desktop base styles were unchanged. Browser viewport/device visual checks and live MongoDB/Resend delivery checks were not performed.

## Deployment

Deploy to Vercel or another host supporting a Node.js Next.js application.

1. Import the GitHub repository.
2. Add environment values in the host's project settings.
3. Set `SITE_URL` to the exact live origin, without a trailing slash.
4. Configure MongoDB connectivity and an accepted email sender.
5. Deploy or redeploy after environment changes.
6. Open `/admin` on the live site and sign in with your configured token.

Use the same variable names as the local environment. The application needs server routes and is not a static HTML export.

## Author

**Farhad Rimon**

- [GitHub](https://github.com/ForhadRimon80)
- [LinkedIn](https://www.linkedin.com/in/farhad-rimon-7487b5201/)
