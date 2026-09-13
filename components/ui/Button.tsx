import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-blue text-white shadow-[0_8px_18px_-10px_rgba(30,58,138,0.65)] [@media(hover:hover)]:hover:bg-blue-deep active:bg-blue-deep",
  pink: "bg-pink text-white shadow-[0_8px_18px_-10px_rgba(236,72,153,0.65)] [@media(hover:hover)]:hover:bg-pink-deep active:bg-pink-deep",
  navy: "bg-ink text-white [@media(hover:hover)]:hover:bg-ink/90 active:bg-ink/90",
  secondary:
    "border border-line bg-paper-bright text-ink [@media(hover:hover)]:hover:border-blue [@media(hover:hover)]:hover:text-blue active:border-blue active:text-blue",
  ghost: "text-blue [@media(hover:hover)]:hover:text-pink active:text-pink",
};

type Props = {
  href?: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  children,
  className,
  ...rest
}: Props) {
  const classes = cn(
    "tactile-press inline-flex min-h-11 touch-manipulation items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-200",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
