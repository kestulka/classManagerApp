import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Container from "./Container";
import "../App.css";

const initialContainers = {
  itemList: [
    { id: "1", title: "vaikas1", imageSrc: "../assets/pics/kiddo.png" },
    { id: "2", title: "vaikas2", imageSrc: "../assets/pics/kiddo.png" },
    { id: "3", title: "vaikas3", imageSrc: "../assets/pics/kiddo.png" },
    { id: "4", title: "vaikas4", imageSrc: "../assets/pics/kiddo.png" },
  ],
  desk1: [],
  desk2: [],
  desk3: [],
  desk4: [],
};

function DragDrop() {
  const [containers, setContainers] = useState(initialContainers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemImageSrc, setNewItemImageSrc] = useState("");

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceContainer = source.droppableId;
    const destinationContainer = destination.droppableId;

    if (sourceContainer === destinationContainer) {
      const items = Array.from(containers[sourceContainer]);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      setContainers((prev) => ({
        ...prev,
        [sourceContainer]: items,
      }));
    } else {
      const sourceItems = Array.from(containers[sourceContainer]);
      const destinationItems = Array.from(containers[destinationContainer]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      setContainers((prev) => ({
        ...prev,
        [sourceContainer]: sourceItems,
        [destinationContainer]: destinationItems,
      }));
    }
  };

  const addItem = () => {
    const newItem = {
      id: (containers.itemList.length + 1).toString(),
      title: newItemTitle,
      imageSrc: newItemImageSrc,
    };

    setContainers((prev) => ({
      ...prev,
      itemList: [...prev.itemList, newItem],
    }));

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
