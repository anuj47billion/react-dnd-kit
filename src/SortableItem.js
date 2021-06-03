import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Chip } from "@material-ui/core";
import { equals } from "ramda";

const StyledSortableItem = ({
  isDragging,
  transform,
  transition,
  setNodeRef,
  attributes,
  listeners,
  id
}) => {
  const style = {
    position: "relative",
    display: "block",
    zIndex: isDragging ? 1 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Chip clickable label={id} size="small" />
    </div>
  );
};

const MemoizedSortableItem = React.memo(
  StyledSortableItem,
  (prevProps, nextProps) =>
    equals(prevProps.id, nextProps.id) &&
    equals(prevProps.isDragging, nextProps.isDragging) &&
    equals(prevProps.transition, nextProps.transition) &&
    equals(prevProps.transform, nextProps.transform)
);

export function SortableItem(props) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  if (props.id === "hello") {
    console.log(transform, transition);
  }

  return (
    <MemoizedSortableItem
      isDragging={isDragging}
      transform={transform}
      transition={transition}
      setNodeRef={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      id={props.id}
    />
  );
}
