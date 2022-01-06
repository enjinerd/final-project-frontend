import clsx from "clsx";
import React from "react";

export const containerStyles = "w-full sm:max-w-xl mx-auto";

export const Container = React.forwardRef(
  ({ className, children, ...rest }, ref) => {
    return (
      <div className={clsx(containerStyles, className)} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
