"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs({ title }: { title?: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">Home</Link>
        </li>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <li className="breadcrumb-item" key={href}>
              {isLast ? <span>{title ?? segment}</span> : <Link href={href}>{segment}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
