import { NextComponentType } from "next";
import React from "react";

interface Props {
  children?: React.ReactNode;
  dark?: boolean;
  shadow?: boolean;
}

export const Card: React.FC<Props> = ({ ...props }) => {
  const styles = {
    dark: "text-white bg-black",
    normal: "border-black bg-white",
    normalShadow: "shadow-cardShadow",
  };
  return (
    <div
      className={`min-h-[100px] min-w-[100px] rounded-meap border px-5 py-4 ${
        props.dark ? styles.dark : styles.normal
      } ${props.shadow && !props.dark ? styles.normalShadow : ""}`}
    >
      {props.children}
    </div>
  );
};
