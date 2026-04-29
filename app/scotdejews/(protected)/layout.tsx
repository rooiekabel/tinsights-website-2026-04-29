import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Dashboard — Tinsights Admin",
  robots: "noindex, nofollow",
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/scotdejews");
  }

  return <AdminShell>{children}</AdminShell>;
}
