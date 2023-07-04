import React from "react";

interface TextProps {
  variant?: "h1" | "h2" | "h3" | "regular";
  dark?: boolean;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ ...props }) => {
  const styles = {
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    regular: "text-base",
    dark: "text-white",
  };
  return (
    <p
      className={`${props.variant ? styles[props.variant] : ""} ${
        props.dark ? styles.dark : ""
      }`}
    >
      {props.children}
    </p>
  );
};
