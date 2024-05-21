import SortableItem from "./SortableItem";
import { Droppable } from "react-beautiful-dnd";
import "../App.css";

function Container({ id, items, title }) {
  return (
    <div className="container">
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map(({ id, title, imageSrc }, index) => (
              <SortableItem
                key={id}
                id={id}
                title={title}
                imageSrc={imageSrc}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Container;
