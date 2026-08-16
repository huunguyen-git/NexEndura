import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbNavProps {
  items: { label: string; href?: string }[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6">
      <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
