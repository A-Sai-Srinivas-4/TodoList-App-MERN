import React, { ReactNode } from "react";
import style from "../styles/modules/title.module.scss";

interface PageTitleProps {
  children: ReactNode; // Ensures type safety for child components
}

const PageTitle = ({ children, ...props }: PageTitleProps) => {
  return (
    <p className={style.title} {...props}>
      {children}
    </p>
  );
};

export default PageTitle;
// Explanation: PageTitle is a component that renders its children
