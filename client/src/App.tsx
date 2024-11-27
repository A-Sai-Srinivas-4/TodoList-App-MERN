import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import { TodoProvider } from "./context/TodoProvider";
import style from "./styles/modules/app.module.scss";
function App() {
  return (
    <TodoProvider>
      <div className="container">
        <PageTitle>Todo List</PageTitle>
        <div className={style.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: "1.4rem",
            },
          }}
        />
      </div>
    </TodoProvider>
  );
}

export default App;
