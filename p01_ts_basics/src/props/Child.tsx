import React from "react";

// All React Components can optionally provide
// these properties
// propTypes, displayName, defaultProps, contextTypes

interface ChildProps {
  color: string;
  onClick: () => void;
}

// Typescript doesn't know that we're making a React component, so it
// thinks that 'Child' will not have these properties!
export const Child = ({ color, onClick }: ChildProps) => {
  return (
    <div>
      {color}
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

// 'Child' will be a React function component
// 'Child' might have properties assigned to it like propTypes, displayName, defaultProps, contextTypes
// 'Child' will receive props of type 'ChildProps'
export const ChildAsFC: React.FC<ChildProps> = ({
  color,
  onClick,
  children,
}) => {
  return (
    <div>
      {color}
      {children}
      <button onClick={onClick}>Click me</button>
    </div>
  );
};
