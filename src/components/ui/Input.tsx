import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  iconPosition = 'left',
  required = false,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'w-full py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';
  const iconClasses = Icon ? (iconPosition === 'left' ? 'pl-12 pr-4' : 'pl-4 pr-12') : 'px-4';

  return (
    <div className="relative">
      {Icon && (
        <Icon className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${
          iconPosition === 'left' ? 'left-3' : 'right-3'
        }`} />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`${baseClasses} ${iconClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      />
    </div>
  );
};

export default Input;