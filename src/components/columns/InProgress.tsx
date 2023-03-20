import { Typography } from "antd";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { inProgressSlice } from "../../redux/slice/inProgress";
import ColumnLayout from "../ColumnLayout";

export function InProgressColumn() {
  const { inProgress } = useSelector((state: StoreState) => state);

  const {
    actions: { completeStatus, remove, add, updateTextShowed },
  } = inProgressSlice;

  return (
    <>
      <Typography style={{ marginBottom: 20 }}>
        All inProgress tasks: {inProgress.length}
      </Typography>
      <ColumnLayout
        droppableId="inProgress"
        labelText="Type 'in progress' item"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        selectorState={inProgress}
        updateTextShowed={updateTextShowed}
      />
    </>
  );
}
