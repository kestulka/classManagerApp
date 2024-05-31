import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Container from "./Container";
import "../App.css";

function DragDrop() {
  const [containers, setContainers] = useState({
    itemList: [],
    desk1: [],
    desk2: [],
    desk3: [],
    desk4: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemImageSrc, setNewItemImageSrc] = useState("");
  const [selectedClass, setSelectedClass] = useState("A");

  useEffect(() => {
    const fetchData = () => {
      const data = JSON.parse(
        localStorage.getItem(`class_${selectedClass}`),
      ) || {
        itemList: [],
        desk1: [],
        desk2: [],
        desk3: [],
        desk4: [],
      };

      setContainers({
        itemList: data.itemList,
        desk1: data.desk1 || [],
        desk2: data.desk2 || [],
        desk3: data.desk3 || [],
        desk4: data.desk4 || [],
      });
    };

    // Reset containers to initial state before fetching new data
    setContainers({
      itemList: [],
      desk1: [],
      desk2: [],
      desk3: [],
      desk4: [],
    });

    fetchData();
  }, [selectedClass]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceContainer = source.droppableId;
    const destinationContainer = destination.droppableId;

    if (
      destinationContainer.startsWith("desk") &&
      containers[destinationContainer].length > 0
    ) {
      return;
    }

    let updatedContainers;
    if (sourceContainer === destinationContainer) {
      const items = Array.from(containers[sourceContainer]);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      updatedContainers = {
        ...containers,
        [sourceContainer]: items,
      };
    } else {
      const sourceItems = Array.from(containers[sourceContainer]);
      const destinationItems = Array.from(containers[destinationContainer]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      updatedContainers = {
        ...containers,
        [sourceContainer]: sourceItems,
        [destinationContainer]: destinationItems,
      };
    }

    setContainers(updatedContainers);

    // Save the updated seating arrangement to local storage
    localStorage.setItem(
      `class_${selectedClass}`,
      JSON.stringify(updatedContainers),
    );
  };

  const addItem = () => {
    const newItem = {
      id: (containers.itemList.length + 1).toString(),
      title: newItemTitle,
      imageSrc: newItemImageSrc,
    };

    const updatedContainers = {
      ...containers,
      itemList: [...containers.itemList, newItem],
    };

    setContainers(updatedContainers);

    // Save the updated item list to local storage
    localStorage.setItem(
      `class_${selectedClass}`,
      JSON.stringify(updatedContainers),
    );

    setIsModalOpen(false);
    setNewItemTitle("");
    setNewItemImageSrc("");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Item</h2>
            <input
              type="text"
              placeholder="Title"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newItemImageSrc}
              onChange={(e) => setNewItemImageSrc(e.target.value)}
              className="modal-input"
            />
            <button onClick={addItem}>Add</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="App">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="A">Class A</option>
          <option value="B">Class B</option>
          <option value="C">Class C</option>
          <option value="D">Class D</option>
        </select>
        <Container
          id="itemList"
          items={containers.itemList}
          title="Item List"
        />
        <div className="desks">
          <button onClick={() => setIsModalOpen(true)}>
            Prideti nauja vaika
          </button>
          <Container id="desk1" items={containers.desk1} title="Desk 1" />
          <Container id="desk2" items={containers.desk2} title="Desk 2" />
          <Container id="desk3" items={containers.desk3} title="Desk 3" />
          <Container id="desk4" items={containers.desk4} title="Desk 4" />
        </div>
      </div>
    </DragDropContext>
  );
}

export default DragDrop;
