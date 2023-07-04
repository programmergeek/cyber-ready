import React from "react";

interface TextProps {
  variant?: "h1" | "h2" | "h3" | "regular";
  dark?: boolean;
  children: React.ReactNode;
  inline?: boolean;
}

export const Text: React.FC<TextProps> = ({ ...props }) => {
  const styles = {
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    regular: "text-base",
    dark: "text-white",
  };

  if (props.inline) {
    return (
      <span
        className={`${props.variant ? styles[props.variant] : ""} ${
          props.dark ? styles.dark : ""
        }`}
      >
        {props.children}
      </span>
    );
  }

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
