import SortableItem from "./SortableItem";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import "../App.css";

function Container({ id, items, title }) {
  return (
    <div className="container">
      <h2>{title}</h2>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        {items.map(({ id, title, imageSrc }) => (
          <SortableItem key={id} id={id} title={title} imageSrc={imageSrc} />
        ))}
      </SortableContext>
    </div>
  );
}

export default Container;
