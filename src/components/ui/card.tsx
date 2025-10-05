import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`}
        {...props}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  }
);