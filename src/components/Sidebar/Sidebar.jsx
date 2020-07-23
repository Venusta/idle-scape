/* eslint-disable no-console */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleInfobox } from "../../redux-stuff";
import Clock from "../Clock/Clock";
import ToggleButton from "../ToggleButton/ToggleButton";
import ImageButton from "../ImageButton/ImageButton";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const infoboxEnabled = useSelector((state) => state.ui.infobox);
  const handleInfoToggle = () => {
    dispatch(toggleInfobox());
    console.log(infoboxEnabled);
  };

  return (
    <div className="sidebar">
      <div className="titleBar">
        <span>Timers</span>
      </div>
      <Clock />
      <ToggleButton onToggle={handleInfoToggle} title="Infobox toggle" />
      <ToggleButton enabled onToggle={handleInfoToggle} />
      <ToggleButton onToggle={handleInfoToggle} />
      <ToggleButton enabled onToggle={handleInfoToggle} />
      <ImageButton />
      <ImageButton />
    </div>
  );
};

export default Sidebar;
