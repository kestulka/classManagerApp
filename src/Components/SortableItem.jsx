import { Draggable } from "react-beautiful-dnd";
import "../App.css";

function SortableItem({ id, title, imageSrc, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="sortable-item"
        >
          <h3>{title}</h3>
          <img src={imageSrc} alt={title} className="sortable-item-image" />
        </div>
      )}
    </Draggable>
  );
}

export default SortableItem;
