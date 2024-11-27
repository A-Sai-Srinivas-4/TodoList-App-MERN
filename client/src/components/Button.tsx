import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

// Use an object for button types
const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger", // Add this type if necessary
};

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  variant: keyof typeof buttonTypes; // Restrict variant to keys of buttonTypes
  [key: string]: any;
}

const Button = ({ children, type, variant, ...rest }: ButtonProps) => {
  return (
    <button
      className={getClasses(
        styles.button,
        styles[`button--${buttonTypes[variant]}`] // Access styles dynamically
      )}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

interface SelectButtonProps {
  children: React.ReactNode;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectButton({ children, ...rest }: SelectButtonProps) {
  return (
    <select
      className={getClasses(styles.button, styles.button__select)}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };

export default Button;
