"use client";

import * as React from "react";
import { Check, Copy, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site-config";

/**
 * 参照: Sorcepronpts/Contactpage.txt（ContactPage）
 * 変更点: 連絡先・SNS を lib/site-config.ts から読む、
 *         shadcn(base-ui) の Button に合わせて props 型を変更、
 *         連絡手段は Email と X の 2 つだけにする（Location / Phone / SNS 一覧は削除）
 */
export function ContactPage() {
  const { contact } = siteConfig;

  return (
    <div className="relative min-h-screen w-full">
      <div className="mx-auto h-full max-w-6xl lg:border-x">
        <div
          aria-hidden
          className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
        >
          <div className="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
          <div className="absolute top-0 left-0 h-320 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
        </div>
        <div className="flex grow flex-col justify-center px-4 pt-32 pb-16 md:px-6">
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Get in touch
          </p>
          <h1 className="mt-2 font-serif text-5xl italic md:text-7xl">
            {contact.heading}
          </h1>
          <p className="mt-4 mb-5 text-base text-muted-foreground">
            {contact.lead}
          </p>
        </div>
        <BorderSeparator />
        <div className="grid md:grid-cols-2">
          <Box
            icon={<Mail className="size-5 text-muted-foreground" strokeWidth={1} />}
            title="Email"
            description="通常、数日以内にご返信いたします。"
          >
            <a
              href={`mailto:${contact.email}`}
              className="font-mono text-base font-medium tracking-wide break-all hover:underline"
            >
              {contact.email}
            </a>
            <CopyButton className="size-6" text={contact.email} />
          </Box>
          <Box
            icon={<XIcon size={20} className="text-muted-foreground" strokeWidth={1} />}
            title="X"
            description="最新情報や新作はこちらで発信しています。"
            className="border-b-0 md:border-r-0"
          >
            <a
              href={contact.x.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-base font-medium tracking-wide hover:underline"
            >
              {contact.x.handle}
            </a>
          </Box>
        </div>
        <BorderSeparator />
      </div>
    </div>
  );
}

function BorderSeparator() {
  return <div className="absolute inset-x-0 h-px w-full border-b" />;
}

type ContactBox = React.ComponentProps<"div"> & {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function Box({ icon, title, description, className, children }: ContactBox) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between border-b md:border-r md:border-b-0",
        className,
      )}
    >
      <div className="flex items-center gap-x-3 border-b bg-muted/40 p-4">
        {icon}
        <h2 className="font-heading text-lg font-medium tracking-wider">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-x-2 p-4 py-12">{children}</div>
      <div className="border-t p-4">
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  text: string;
};

function CopyButton({
  className,
  variant = "ghost",
  size = "icon",
  text,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("relative disabled:opacity-100", className)}
      onClick={handleCopy}
      aria-label={copied ? "コピーしました" : "クリップボードにコピー"}
      disabled={copied || props.disabled}
      {...props}
    >
      <div
        className={cn(
          "transition-all",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      >
        <Check className="size-3.5 stroke-emerald-500" aria-hidden="true" />
      </div>
      <div
        className={cn(
          "absolute transition-all",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <Copy aria-hidden="true" className="size-3.5" />
      </div>
    </Button>
  );
}
