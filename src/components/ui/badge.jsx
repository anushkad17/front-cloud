import React from "react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/lib/variants"; // Import from your new variants file

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge }; // Only export the component now