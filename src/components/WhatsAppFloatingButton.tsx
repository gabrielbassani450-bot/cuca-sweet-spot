import { cn } from "@/lib/utils";

type WhatsAppFloatingButtonProps = {
  href: string;
  className?: string;
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    role="img"
    aria-hidden="true"
    className={cn("h-5 w-5", className)}
    fill="currentColor"
  >
    <path d="M19.11 17.23c-.26-.13-1.55-.76-1.79-.85-.24-.09-.41-.13-.58.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.28-.77-.68-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.06-.13-.58-1.39-.79-1.9-.21-.5-.43-.43-.58-.44l-.5-.01c-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19s.94 2.54 1.07 2.72c.13.17 1.86 2.84 4.5 3.98.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.17-.5-.3ZM16.02 3.2c-7.04 0-12.77 5.73-12.77 12.77 0 2.24.59 4.43 1.7 6.35L3.2 28.8l6.66-1.72a12.71 12.71 0 0 0 6.16 1.57h.01c7.04 0 12.77-5.73 12.77-12.77S23.06 3.2 16.02 3.2Zm0 23.27h-.01c-1.98 0-3.92-.53-5.62-1.52l-.4-.24-3.95 1.02 1.05-3.85-.26-.4a10.54 10.54 0 0 1-1.61-5.61c0-5.83 4.74-10.57 10.57-10.57 2.82 0 5.47 1.1 7.46 3.1a10.5 10.5 0 0 1 3.1 7.47c0 5.83-4.74 10.57-10.57 10.57Z" />
  </svg>
);

export function WhatsAppFloatingButton({ href, className }: WhatsAppFloatingButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className={cn(
        "fixed bottom-4 right-4 z-50 mb-safe inline-flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-bar transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <WhatsAppIcon />
      <span className="text-sm font-semibold">WhatsApp</span>
    </a>
  );
}
