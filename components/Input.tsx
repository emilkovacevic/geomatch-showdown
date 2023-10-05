interface InputProps {
  type: string;
  value?: string | File | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string; // Make name property optional
  id: string;
  placeholder?: string;
  onBlur?: () => void;
  error?: string;
}


const Input = ({
  type,
  value,
  onChange,
  name,
  id,
  placeholder,
  onBlur,
  error,
}: InputProps) => {
  if (type === "file") {
  
    return (
      <div>
        <input
          id={id}
          type={type}
          onChange={onChange}
          name={name}
          accept="image/*" 
        />
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    );
  }

  return (
    <div>
      <input
        id={id}
        type={type}
        onChange={onChange}
        value={value as string} // Cast value to string
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        className="w-full p-4 mb-2 border bg-card focus:border-primary text-foreground"
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default Input;
