import { InputGroupProps } from "../types"

const InputGroup: React.FC<InputGroupProps> = ({ type, name, value, label, placeholder, pattern, maxLength, handler }) => {
  return (
    <div className={`mb-6 ${type}`}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={name}
        name={name}
        onInput={handler}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none"
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        value={value}
        required
      ></input>
    </div>
  );
};

export default InputGroup;
