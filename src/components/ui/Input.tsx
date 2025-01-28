interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
  }
  
  export function Input({ error, className = '', ...props }: InputProps) {
    return (
      <div className="space-y-1">
        <input
          className={`
            w-full px-3 py-2 rounded-md border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:opacity-50 disabled:bg-gray-100
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }