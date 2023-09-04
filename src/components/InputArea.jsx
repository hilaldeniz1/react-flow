const InputArea = ({ label, type, name, holder }) => {
  return (
    <div>
      <label className="mb-2 text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={holder}
        className="bg-gray-700 my-2 border border-gray-600 placeholder-gray-400 p-2.5 block w-full rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default InputArea;
