import React, { useEffect, useState } from "react";
import styles from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import { format } from "date-fns/esm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Todo, useTodoContext } from "../context/TodoContext";
import toast from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
import { motion } from "framer-motion";
import { deleteTodoHandler, updateTodoHandler } from "../services/todoHandlers";

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

interface TodoItemProps {
  todo: Todo;
  key: string;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { dispatch } = useTodoContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);

    // Call the updateTodoHandler
    updateTodoHandler(
      { ...todo, status: checked ? "incomplete" : "complete" },
      dispatch
    );

    !checked
      ? toast.success("Todo completed successfully!")
      : toast.success("Todo updated successfully!");
  };

  const handleDelete = () => {
    // dispatch({
    //   type: "DELETE_TODO",
    //   payload: todo,
    // });
    deleteTodoHandler(todo._id!, dispatch);
    toast.success("Todo deleted successfully!");
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses(
                styles.todoText,
                todo.status === "complete" ? styles["todoText--completed"] : ""
              )}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "p, MM/dd/yyyy")}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <DeleteIcon />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <EditIcon />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        todo={todo}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default TodoItem;
