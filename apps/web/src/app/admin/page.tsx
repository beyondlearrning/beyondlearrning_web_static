import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AdminSubmissions } from "@/components/sections/clat-live/AdminSubmissions";

export const metadata: Metadata = {
  title: "Admin · CLAT Live",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="bg-background">
      <Container className="py-14 sm:py-16">
        <AdminSubmissions />
      </Container>
    </section>
  );
}
