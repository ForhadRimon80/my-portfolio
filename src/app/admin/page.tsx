import { redirect } from "next/navigation";
import PageHeading from "@/components/common/PageHeading";
import StatsCards from "@/components/admin/StatsCards";
import LogoutButton from "@/components/admin/LogoutButton";
import { isAdmin } from "@/lib/adminAuth";
import getAdminStats from "@/lib/adminStats";

export const metadata = {
  title: "Admin statistics",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function Admin() {
  if (!(await isAdmin())) redirect("/admin/login");
  const stats = await getAdminStats();
  return (
    <>
      <PageHeading
        label="PRIVATE DASHBOARD"
        title="Your portfolio, in numbers."
        description="A private view of your website and GitHub statistics."
      />
      <StatsCards stats={stats} />
      <LogoutButton />
    </>
  );
}
