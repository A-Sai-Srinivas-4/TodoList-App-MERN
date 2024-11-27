import React from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { useTodoContext } from "../context/TodoContext";
const AppHeader = () => {
  const { state } = useTodoContext();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const filterStatus = state.filterStatus;
  const { dispatch } = useTodoContext();
  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "UPDATE_FILTERS_STATUS",
      payload: e.target.value,
    });
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <TodoModal
        type="add"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default AppHeader;
