import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./context";

const Colors = () => {
  const { location, setIsColorsOpen, tasks, setTasks } = useGlobalContext();
  const colorsRef = useRef(null);

  useEffect(() => {
    const { top, right } = location;
    colorsRef.current.style.left = `${right + 30}px`;
    colorsRef.current.style.top = `${top - 20}px`;
  }, [location]);

  const changeColor = (e) => {
    const color = e.target.style.backgroundColor;
    const { id } = location;
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, color: color } : task;
      })
    );
    setIsColorsOpen(false);
  };

  return (
    <div ref={colorsRef} className='color-container'>
      <span style={{ backgroundColor: "#845EC2" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#86A8E7" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#D16BA5" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#D65DB1" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#FF6F91" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#FF9671" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#FFC75F" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#F9F871" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#5FFBF1" }} onClick={changeColor}></span>   
    </div>
  );
};

export default Colors;
