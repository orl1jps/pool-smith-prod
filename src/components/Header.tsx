"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu / open submenu after navigating.
  const closeMenu = () => {
    setOpen(false);
    setOpenGroup(null);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      {/* Top utility bar */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <p className={styles.tagline}>{site.tagline}</p>
          <ul className={styles.contactList}>
            <li>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </li>
            <li className={styles.hideSm}>{site.hours}</li>
            <li>
              <a href={site.emailHref}>{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main nav */}
      <div className={styles.navbar}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={300}
              height={125}
              priority
            />
          </Link>

          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">Toggle menu</span>
            <span className={`${styles.bars} ${open ? styles.barsOpen : ""}`} />
          </button>

          <nav
            id="primary-nav"
            className={`${styles.nav} ${open ? styles.navOpen : ""}`}
            aria-label="Primary"
          >
            <ul className={styles.menu}>
              {nav.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                const hasChildren = !!item.children?.length;
                return (
                  <li
                    key={item.href}
                    className={hasChildren ? styles.hasChildren : ""}
                  >
                    <div className={styles.menuRow}>
                      <Link
                        href={item.href}
                        className={active ? styles.active : ""}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          className={styles.subToggle}
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={openGroup === item.label}
                          onClick={() =>
                            setOpenGroup((g) =>
                              g === item.label ? null : item.label
                            )
                          }
                        >
                          ▾
                        </button>
                      )}
                    </div>
                    {hasChildren && (
                      <ul
                        className={`${styles.submenu} ${
                          openGroup === item.label ? styles.submenuOpen : ""
                        }`}
                      >
                        {item.children!.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onClick={closeMenu}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <a href={site.phoneHref} className={`btn btn-accent ${styles.navCta}`}>
              Call {site.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
