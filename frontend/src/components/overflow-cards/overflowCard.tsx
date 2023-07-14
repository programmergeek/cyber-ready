import React from "react";
import { Card } from "../card/card";

interface OverflowCardProps {
  title?: string;
  children?: React.ReactNode;
  height?: string;
}

export const OverflowCard: React.FC<OverflowCardProps> = ({ ...props }) => {
  return (
    <Card dark>
      <div
        className={`w-full rounded-meap bg-deepBlack px-4 py-3 ${
          props.title ? "" : "hidden"
        }`}
      >
        {props.title}
      </div>
      <div className="relative">
        <div
          className={`-z-10 mt-5 overflow-auto px-2 pb-2 ${
            props.height ? props.height : "max-h-64"
          }`}
        >
          {props.children}
        </div>
        <div className="absolute bottom-0 h-8 w-full bg-gradient-to-t from-black"></div>
      </div>
    </Card>
  );
};
