import cn from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  className?: string;
  onClick?: () => any;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  ...buttonProps
}: ButtonProps) {
  const handleOnClick = () => {
    if (disabled) return;
    onClick && onClick();
  };

  return (
    <button
      className={cn(
        disabled
          ? 'bg-gray-400'
          : 'bg-orange-600 hover:scale-105 transition-all cursor-pointer',
        'px-4 py-2 bg-orange-600 rounded-sm',
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
