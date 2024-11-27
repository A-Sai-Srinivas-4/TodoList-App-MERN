import React, { useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const AppContent = () => {
  const { state } = useTodoContext();
  const sortedTodosList = state?.todos.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const filteredTodosList = sortedTodosList.filter((todo: any) => {
    if (state.filterStatus === "all") {
      return true;
    } else {
      return todo.status === state.filterStatus;
    }
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodosList && filteredTodosList.length > 0 ? (
          filteredTodosList.map((todo: any) => (
            <TodoItem todo={todo} key={todo._id} />
          ))
        ) : (
          <motion.p className={styles.emptyText} variants={child}>
            No Todos Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AppContent;
