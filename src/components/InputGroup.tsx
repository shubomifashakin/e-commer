type InputGroupTypes = {
  name?: string;
  label: string;
  placeholder?: string;
  inputType?: string;
  disabled?: boolean;
  value?: string | number;
};

export function InputGroup({
  name,
  label,
  placeholder,
  inputType,
  disabled,
  value,
}: InputGroupTypes) {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>

      <input
        className="p-2 bg-primary disabled:text-stone-300 disabled:bg-secondary disabled:cursor-not-allowed border rounded-sm placeholder:text-xs outline-none"
        placeholder={placeholder}
        type={inputType}
        name={name}
        id={name}
        disabled={disabled}
        required
        defaultValue={value}
      />
    </div>
  );
}
