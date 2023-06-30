import React, { useState } from "react";

interface ProgressProps {
  totalTasks: number;
  completedTasks?: number;
  dark?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({ ...props }) => {
  const [currentTask] = useState(
    props.completedTasks ? props.completedTasks : 0
  );

  const ProgressPills = (num: number) => {
    const pills = [] as any[];
    for (let i = 0; i < num; i++) {
      if (i < currentTask) {
        pills.push(<ProgressPill completed />);
      } else {
        pills.push(<ProgressPill />);
      }
    }
    return pills;
  };
  return (
    <>
      <div className={`${props.dark ? "text-white" : "text-black"} mb-4`}>
        {currentTask} / {props.totalTasks}
      </div>
      <div className="flex gap-1">
        {ProgressPills(props.totalTasks).map((pill) => pill)}
      </div>
    </>
  );
};

interface ProgressPillProps {
  completed?: boolean;
}

const ProgressPill: React.FC<ProgressPillProps> = ({ ...props }) => {
  return (
    <div
      className={`h-2 w-full rounded-full ${
        props.completed ? "bg-green" : "bg-lightGrey"
      }`}
    ></div>
  );
};
