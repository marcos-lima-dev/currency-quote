import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ onClick, children, variant = 'primary' }: ButtonProps) => {
  const baseStyle = 'px-4 py-2 rounded-md font-medium';
  const styles = {
    primary: `${baseStyle} bg-blue-600 text-white hover:bg-blue-700`,
    secondary: `${baseStyle} bg-gray-200 text-gray-800 hover:bg-gray-300`
  };

  return (
    <button onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
};