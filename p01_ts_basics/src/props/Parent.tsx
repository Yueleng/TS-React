import { ChildAsFC } from "./Child";

const Parent = () => {
  return (
    <ChildAsFC color="red" onClick={() => console.log("Click")}>
      some child text
    </ChildAsFC>
  );
};

export default Parent;
