import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { rectSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "./Components/SortableItem";
import "./App.css";

const initialItems = [
  { id: "1", title: "vaikas1", imageSrc: "../assets/pics/kiddo.png" },
  { id: "2", title: "vaikas2", imageSrc: "../assets/pics/kiddo.png" },
  { id: "3", title: "vaikas3", imageSrc: "../assets/pics/kiddo.png" },
  { id: "4", title: "vaikas4", imageSrc: "../assets/pics/kiddo.png" },
];

function App() {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        {items.map(({ id, title, imageSrc }) => (
          <SortableItem key={id} id={id} title={title} imageSrc={imageSrc} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default App;
