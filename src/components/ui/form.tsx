import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ title, description, className = '', children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${className}`}
        {...props}
      >
        {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        {children}
      </form>
    );
  }
);