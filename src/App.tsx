import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ToDoColumn } from "./components/columns/ToDo";
import { DoneColumn } from "./components/columns/Done";
import { InProgressColumn } from "./components/columns/InProgress";
import { todoSlice as todo } from "./redux/slice/todo";
import { inProgressSlice as inProgress } from "./redux/slice/inProgress";
import { doneSlice as done } from "./redux/slice/done";
import { StoreState } from "./redux/store";
import { IModel } from "./types";
import { Col, Row } from "antd";

type TAllSilces = "todo" | "inProgress" | "done";

function App() {
  const dispatch = useDispatch();
  const appState = useSelector((state: StoreState) => state);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { destination, source, draggableId } = result;
    const allSlices = { todo, inProgress, done };

    if (destination.droppableId === source.droppableId) {
      dispatch(
        allSlices[destination.droppableId as TAllSilces].actions.reorder(result)
      );
    } else {
      const [filterState] = (
        (appState as any)[source.droppableId] as IModel[]
      ).filter(({ id }) => id === draggableId);

      dispatch(
        allSlices[source.droppableId as TAllSilces].actions.remove(draggableId)
      );
      dispatch(
        allSlices[destination.droppableId as TAllSilces].actions.update({
          ...result,
          filterState,
        })
      );
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
        <Row gutter={[50, 0]} justify="center">
          <Col xxl={5}>
            <ToDoColumn />
          </Col>
          <Col sm={5}>
            <InProgressColumn />
          </Col>
          <Col sm={5}>
            <DoneColumn />
          </Col>
        </Row>
      </DragDropContext>
    </div>
  );
}

export default App;
