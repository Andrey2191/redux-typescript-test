import React, { useState } from "react";
import { Card, Space } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { List } from "antd";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { StoreDispatch } from "../redux/store";
import { IColumnLayoutProps } from "../types";

const ColumnLayout: React.FC<IColumnLayoutProps> = ({
  labelText,
  addHandler,
  removeHandler,
  completedHandler,
  selectorState,
  droppableId,
}) => {
  const [textDescription, setTextDescription] = useState("");
  const dispatch = useDispatch<StoreDispatch>();

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(value);
  };

  const handleOnClick = () => {
    dispatch(addHandler(textDescription));
    setTextDescription("");
  };

  const handleInputKeyDown = ({
    target,
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      if (
        (target as HTMLInputElement).value.length > 0 &&
        (target as HTMLInputElement).value.length <= 200
      ) {
        handleOnClick();
      }
    }
  };

  return (
    <Card style={{ textAlign: "center" }}>
      <Input
        placeholder={labelText}
        onChange={handleOnChange}
        onKeyDown={handleInputKeyDown}
        value={textDescription}
      />

      <Card>
        <Button
          color="primary"
          onClick={handleOnClick}
          disabled={
            textDescription.length === 0 || textDescription.length > 200
          }
        >
          Add Item
        </Button>
      </Card>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef}>
            <List
              style={{
                minHeight: "300px",
              }}
              {...provided.droppableProps}
            >
              {selectorState.map(
                (
                  { id, text, isFinished, createdAt, updatedAt, isTextShowed },
                  index: number
                ) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        style={{}}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          style={{
                            border: "none",
                            textAlign: "center",
                          }}
                        >
                          {updatedAt ? "Updated" : "Created"} at:{" "}
                          {updatedAt || createdAt}
                        </Card>
                        <span>{text}</span>
                        <Space
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Checkbox
                            value={isFinished}
                            checked={isFinished}
                            onChange={() =>
                              dispatch(
                                completedHandler({
                                  isFinished: !isFinished,
                                  id,
                                  updatedAt: new Date().toLocaleString(),
                                })
                              )
                            }
                          />
                          <Button onClick={() => dispatch(removeHandler(id))}>
                            <DeleteOutlined />
                          </Button>
                        </Space>
                      </Card>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </List>
          </div>
        )}
      </Droppable>
    </Card>
  );
};

export default ColumnLayout;
