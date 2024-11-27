import React, { useEffect, useState } from "react";
import { Todo, useTodoContext } from "../context/TodoContext";
import styles from "../styles/modules/modal.module.scss";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "./Button";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { addTodoHandler, updateTodoHandler } from "../services/todoHandlers";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

interface TodoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  todo?: Todo;
}

const TodoModal = ({
  type,
  isModalOpen,
  setIsModalOpen,
  todo,
}: TodoModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<string>("incomplete");

  const { dispatch } = useTodoContext(); // Access the dispatch function from the context

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo?.title);
      setStatus(todo?.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, isModalOpen]);

  const handleAddTodo = () => {
    const newTodo: Todo = {
      title,
      status,
      time: new Date().toLocaleString(),
    };

    // Call the addTodoHandler
    addTodoHandler(newTodo, dispatch);
  };

  const handleUpdateTodo = () => {
    const updatedTodo: Todo = {
      _id: todo?._id!,
      title,
      status,
      time: new Date().toLocaleString(),
    };

    // Call the updateTodoHandler
    updateTodoHandler(updatedTodo, dispatch);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      toast.error("Please enter a task title.");
      return;
    }

    if (title && status) {
      if (type === "add") {
        handleAddTodo();

        toast.success("Todo added successfully");
      }
      if (type === "update") {
        if (title !== todo?.title || status !== todo?.status) {
          handleUpdateTodo();

          toast.success("Todo updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.container}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
                onKeyDown={() => setIsModalOpen(false)}
                role="button"
                tabIndex={0}
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                <ClearIcon />
              </motion.div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.formTitle}>
                  {type === "update" ? "Update" : "Add"} Task
                </h1>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                  />
                </label>
                <label htmlFor="status">
                  Status
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </label>
                <div className={styles.buttonContainer}>
                  <Button type="submit" variant="primary">
                    {type === "update" ? "Update" : "Add"} Task
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                    onKeyDown={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoModal;
