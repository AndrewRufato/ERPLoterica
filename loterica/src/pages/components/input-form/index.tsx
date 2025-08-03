import './index.css';
import React from 'react';

interface InputFormProps {
  placeholder?: string;
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm({
  placeholder = "",
  id = "",
  type = "text",
  name = "",
  value = "",
  onChange = () => {}
}: InputFormProps) {
  return (
    <div className="InputForm">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
