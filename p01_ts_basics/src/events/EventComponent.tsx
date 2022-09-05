import React, { useCallback } from "react";

const EventComponent: React.FC = () => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  }, []);

  const onDragStart = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    console.log(event);
  }, []);

  return (
    <div>
      <input onChange={onChange} />
      <div draggable onDragStart={onDragStart}>
        Drag Me!
      </div>
    </div>
  );
};

export default EventComponent;
