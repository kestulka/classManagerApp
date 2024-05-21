import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../App.css";

function SortableItem({ id, title, imageSrc }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="sortable-item"
    >
      <h3>{title}</h3>
      <img src={imageSrc} alt={title} className="sortable-item-image" />
    </div>
  );
}

export default SortableItem;
