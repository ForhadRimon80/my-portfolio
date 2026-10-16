import { redirect } from "next/navigation";
import PageHeading from "@/components/common/PageHeading";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isAdmin } from "@/lib/adminAuth";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLogin() {
  if (await isAdmin()) redirect("/admin");
  return (
    <>
      <PageHeading
        label="OWNER ACCESS"
        title="Welcome back, Farhad."
        description="Sign in with your private admin token to view statistics."
      />
      <AdminLoginForm />
    </>
  );
}
