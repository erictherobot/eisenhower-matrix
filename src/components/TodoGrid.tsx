import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Todo from "./Todo";

type TodoGridProps = {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, updatedTodo: Todo) => void;
};

const TodoGrid = ({ todos, onDeleteTodo, onEditTodo }: TodoGridProps) => {
  const quadrants = ["Do", "Decide", "Delegate", "Delete"];

  const handleDragEnd = (result: {
    destination: { droppableId: any; index: any };
    source: { droppableId: any; index: any };
  }) => {
    if (!result.destination) {
      return;
    }

    const sourceQuadrant = result.source.droppableId;
    const destQuadrant = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    const sourceTodos = todos.filter(
      (todo) => todo.quadrant === sourceQuadrant
    );
    const movedTodo = sourceTodos[sourceIndex];

    // Update the quadrant of the moved Todo
    const updatedTodo = { ...movedTodo, quadrant: destQuadrant };

    onEditTodo(movedTodo.id, updatedTodo);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {quadrants.map((quadrant, quadrantIndex) => {
          const quadrantTodos = todos.filter(
            (todo) => todo.quadrant === quadrant
          );

          return (
            <Droppable droppableId={quadrant} key={quadrantIndex}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <h2 className="text-xl font-bold">
                    {quadrant.replace("-", " ")}
                  </h2>
                  {quadrantTodos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Todo
                            todo={todo}
                            onTodoDelete={onDeleteTodo}
                            onTodoEdit={onEditTodo}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TodoGrid;
