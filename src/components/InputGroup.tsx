type InputGroupTypes = {
  name: string;
  label: string;
  placeholder: string;
  inputType: string;
};

export function InputGroup({
  name,
  label,
  placeholder,
  inputType,
}: InputGroupTypes) {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>

      <input
        className="p-1.5 rounded-sm placeholder:text-xs outline-none"
        placeholder={placeholder}
        type={inputType}
        name={name}
        id={name}
      />
    </div>
  );
}
