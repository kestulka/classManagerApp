import React, { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Container from "./Components/Container";
import "./App.css";

// pavyzdiniai duomenys be db
const initialContainers = {
  itemList: [
    { id: "1", title: "vaikas1", imageSrc: "../assets/pics/kiddo.png" },
    { id: "2", title: "vaikas2", imageSrc: "../assets/pics/kiddo.png" },
    { id: "3", title: "vaikas3", imageSrc: "../assets/pics/kiddo.png" },
    { id: "4", title: "vaikas4", imageSrc: "../assets/pics/kiddo.png" },
  ],
  classroomA: [],
  classroomB: [],
  classroomC: [],
};

function App() {
  const [containers, setContainers] = useState(initialContainers);
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeContainer = Object.keys(containers).find((key) =>
      containers[key].some((item) => item.id === active.id),
    );

    const overContainer = over.data.current?.sortable?.containerId;

    console.log("Active Container:", activeContainer);
    console.log("Over Container:", overContainer);

    if (activeContainer && overContainer && activeContainer !== overContainer) {
      setContainers((prev) => {
        const activeItems = [...prev[activeContainer]];
        const overItems = [...prev[overContainer]];

        const activeIndex = activeItems.findIndex(
          (item) => item.id === active.id,
        );
        const [movedItem] = activeItems.splice(activeIndex, 1);

        overItems.push(movedItem);

        return {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        };
      });
    } else if (activeContainer === overContainer) {
      setContainers((prev) => {
        const items = [...prev[activeContainer]];
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return {
          ...prev,
          [activeContainer]: arrayMove(items, oldIndex, newIndex),
        };
      });
    }
  };

  const renderDragOverlay = () => {
    if (!activeId) return null;

    const activeContainer = Object.keys(containers).find((key) =>
      containers[key].some((item) => item.id === activeId),
    );

    if (!activeContainer) return null;

    const activeItem = containers[activeContainer].find(
      (item) => item.id === activeId,
    );

    return (
      <div className="sortable-item">
        <h3>{activeItem.title}</h3>
        <img
          src={activeItem.imageSrc}
          alt={activeItem.title}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
    );
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="App">
        <Container
          id="itemList"
          items={containers.itemList}
          title="Item List"
        />
        <Container
          id="classroomA"
          items={containers.classroomA}
          title="Classroom A"
        />
        <Container
          id="classroomB"
          items={containers.classroomB}
          title="Classroom B"
        />
        <Container
          id="classroomC"
          items={containers.classroomC}
          title="Classroom C"
        />
        <DragOverlay>{renderDragOverlay()}</DragOverlay>
      </div>
    </DndContext>
  );
}

export default App;
