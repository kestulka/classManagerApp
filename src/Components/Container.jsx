import React from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import "../App.css";

function Container({ id, items, title }) {
  return (
    <div className="container">
      <h2>{title}</h2>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {items.map(({ id, title, imageSrc }) => (
          <SortableItem key={id} id={id} title={title} imageSrc={imageSrc} />
        ))}
      </SortableContext>
    </div>
  );
}

export default Container;
