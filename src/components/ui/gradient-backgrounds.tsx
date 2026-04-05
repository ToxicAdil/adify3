import { cn } from "@/lib/utils";

export const GradientBackground = ({ 
  className,
  variant = "top" 
}: { 
  className?: string;
  variant?: "top" | "bottom";
}) => {
  return (
    <div
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        background: variant === "top" 
          ? "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)"
          : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
      }}
    />
  );
};
