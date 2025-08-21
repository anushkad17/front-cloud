// src/components/ui/toggle.jsx
import React from "react";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/lib/variants/toggle-variants";

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button
    className={cn(toggleVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
));

Toggle.displayName = "Toggle";

export { Toggle };