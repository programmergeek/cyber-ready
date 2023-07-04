import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const TextField: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ ...props }) => {
  return (
    <input
      {...props}
      type="text"
      className="mb-5 h-8 w-full rounded-meap border border-black px-2 focus:outline-none"
    />
  );
};
