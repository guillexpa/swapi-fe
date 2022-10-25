import cn from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => any;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

function Button({
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  ...buttonProps
}: ButtonProps) {
  const handleOnClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };

  return (
    <button
      className={cn(
        disabled
          ? 'bg-gray-400'
          : 'bg-orange-600 hover:opacity-70 transition-all duration-200 cursor-pointer',
        'flex px-4 py-2 rounded-sm',
        className,
      )}
      disabled={disabled}
      type={type}
      onClick={handleOnClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
