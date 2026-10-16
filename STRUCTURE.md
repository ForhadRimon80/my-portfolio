# কোন file কী কাজ করে

| কাজ | File/folder |
| --- | --- |
| সব page-এর wrapper | `src/app/layout.tsx` |
| Home section সাজানো | `src/app/page.tsx` |
| Home banner, about cards, featured projects | `src/components/homePage/` |
| Header, active link, theme, command search | `src/components/header/` |
| Footer | `src/components/Footer.tsx` |
| Profile / project / tool তথ্য | সংশ্লিষ্ট `src/data/` file |
| Project card ও filter | `src/components/projects/` |
| Project details | `src/app/projects/[slug]/page.tsx` |
| Contact form | `src/components/contact/ContactForm.tsx` |
| Contact email API | `src/app/api/contact/route.ts` |
| Page render হওয়ার আগেই session gate | `src/proxy.ts` |
| Admin page; server authentication আগে | `src/app/admin/page.tsx` |
| Admin login page | `src/app/admin/login/page.tsx` |
| Token নেওয়ার form | `src/components/admin/AdminLoginForm.tsx` |
| Login request ও session cookie তৈরি | `src/app/api/admin/login/route.ts` |
| Logout request ও cookie clear | `src/app/api/admin/logout/route.ts` |
| Session cookie পড়া ও owner check | `src/lib/adminAuth.ts` |
| Session signature / expiry logic | `src/lib/sessionToken.ts` |
| Private stats data আনা | `src/lib/adminStats.ts` |
| Stats cards | `src/components/admin/StatsCards.tsx` |
| Logout button | `src/components/admin/LogoutButton.tsx` |
| Page-view tracking | `src/components/stats/ViewTracker.tsx` + `src/app/api/views/route.ts` |
| Database / email / validation | `src/lib/db.ts`, `email.ts`, `validation.ts` |
| Request / toast helper | `src/lib/apiRequest.ts`, `showToast.tsx` |
| Design | `src/app/globals.css` |

## Admin flow

`/admin` → server cookie check → session না থাকলে `/admin/login` → token submit → server token যাচাই → signed HttpOnly cookie → `/admin` → private Stats।

Refresh-এর পর cookie valid থাকলে আবার token দেওয়া লাগে না। আট ঘণ্টা পর session expire করে। Logout cookie মুছে দেয়। ADMIN_TOKEN বদলালে আগের session আর valid থাকে না। কোনো secret browser localStorage-এ রাখা হয় না।

Public project দেখার জন্য এই login দরকার নেই। Admin-এর URL navigation-এ না থাকলেও সরাসরি `/admin` লিখে ঢুকতে পারবে।

## পরিবর্তন করার সময়

Project যোগ করতে `src/data/projects.ts`, tool যোগ করতে `src/data/tools.ts` বদলাবে। Main data ছাড়াও Home-এর custom collage/heading এবং About-এর hardcoded copy আলাদাভাবে edit করতে হয়। GitHub stats account `src/lib/adminStats.ts`-এ আছে।

Environment value নিজের `.env.local` বা `.env` file-এ রাখবে; নতুন ZIP-এ আসল secret দেওয়া নেই। Admin login-এর জন্য ADMIN_TOKEN; statistics-এর page reads-এর জন্য MongoDB + APP_SECRET লাগবে। Resend শুধু contact email-এর জন্য।
