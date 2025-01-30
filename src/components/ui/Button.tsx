// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     variant?: 'default' | 'outline';
//     size?: 'sm' | 'md' | 'lg';
//     children: React.ReactNode;
//   }
  
//   export function Button({
//     variant = 'default',
//     size = 'md',
//     className = '',
//     children,
//     ...props
//   }: ButtonProps) {
//     const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
//     const variants = {
//       default: "bg-blue-600 text-white hover:bg-blue-700",
//       outline: "border border-gray-300 bg-transparent hover:bg-gray-100"
//     };
  
//     const sizes = {
//       sm: "h-9 px-3 text-sm",
//       md: "h-10 px-4",
//       lg: "h-11 px-8"
//     };
  
//     return (
//       <button
//         className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
//         {...props}
//       >
//         {children}
//       </button>
//     );
//   }
  
  // src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  className,
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-lg transition-colors duration-300";
  const variantStyles =
    variant === "outline"
      ? "border border-gray-600 text-gray-600"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    />
  );
};