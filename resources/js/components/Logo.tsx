import logo1 from "@/assets/images/logo-1.png";
import logo2 from "@/assets/images/logo-2.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: 1 | 2;
};

export const Logo = ({ className, variant = 1 }: LogoProps) => {
  const src = variant === 1 ? logo1 : logo2;
  return (
    <img
      src={src}
      alt="AACOHS Logo"
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
};

export default Logo;
