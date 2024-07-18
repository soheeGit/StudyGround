import React, { useState } from "react";
import "./SidebarItem.css";

const SidebarItem = ({ title, icon, isSelected, onClick }) => {
  const itemClass = isSelected
    ? "sidebaritem-container-selected"
    : "sidebaritem-container";
  return (
    <div className={itemClass} onClick={onClick}>
      <div className="sidebaritem-icon">{icon}</div>
      <div className="sidebaritem-title">{title}</div>
    </div>
  );
};
export default SidebarItem;
