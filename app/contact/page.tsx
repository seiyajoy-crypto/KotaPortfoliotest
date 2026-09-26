import type { Metadata } from "next";

import { ContactPage as ContactPageContent } from "@/components/ui/contact-page";

export const metadata: Metadata = { title: "Contact" };

/**
 * Contact ページ
 * 参照: Sorcepronpts/Contactpage.txt
 * 連絡先・SNS は lib/site-config.ts の contact / socialLinks から読む。
 */
export default function ContactPage() {
  return <ContactPageContent />;
}
