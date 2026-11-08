import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { courseHref, enquiryHref, mainNav } from "@/config/navigation";
import { Icon } from "@/components/ui/Icon";
import { contact, emailHref, phoneHref } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { activeSocialLinks } from "@/config/social";
import { courses } from "@/content/courses";

const headingClass =
  "text-xs font-semibold tracking-[0.25em] text-brand uppercase";
const iconLinkClass =
  "flex size-11 items-center justify-center rounded-full border border-accent/60 text-brand transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none";
const linkClass = "text-sm text-muted transition-colors hover:text-brand";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-accent bg-background">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" aria-label={siteConfig.name} className="block w-fit">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.name}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              sizes="190px"
              className="h-20 w-auto"
            />
          </Link>
          <p className="mt-3 text-[0.68rem] font-semibold tracking-[0.3em] text-brand/70 uppercase">
            {siteConfig.signature}
          </p>
          <p className="mt-6 text-xs font-semibold tracking-[0.25em] text-brand uppercase">
            {siteConfig.tagline}
          </p>
          <p className="mt-1 font-display text-xl text-muted">
            {siteConfig.strapline}
          </p>

          <ul aria-label="Contact and social media" className="mt-8 flex flex-wrap items-center gap-3">
            <li>
              <a
                href={emailHref}
                aria-label={`Email ${contact.email}`}
                className={iconLinkClass}
              >
                <Icon name="mail" className="size-5" strokeWidth={1.25} />
              </a>
            </li>
            <li>
              <a
                href={phoneHref}
                aria-label={`Call ${contact.phone}`}
                className={iconLinkClass}
              >
                <Icon name="phone" className="size-5" strokeWidth={1.25} />
              </a>
            </li>
            {activeSocialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on ${link.label} (opens in a new tab)`}
                  className={iconLinkClass}
                >
                  <Icon name={link.icon} className="size-5" strokeWidth={1.25} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <h2 className={headingClass}>Explore</h2>
          <ul className="mt-5 space-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className={headingClass}>Courses</h2>
          <ul className="mt-5 space-y-3">
            {courses.map((course) => (
              <li key={course.slug}>
                <Link href={courseHref(course.slug)} className={linkClass}>
                  {course.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={enquiryHref}
            className="mt-8 inline-block text-sm font-medium text-brand underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent"
          >
            Talk to a mentor
          </Link>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-display">{siteConfig.strapline}</p>
        </Container>
      </div>
    </footer>
  );
}
