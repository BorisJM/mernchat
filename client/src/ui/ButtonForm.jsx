function ButtonForm({ children }) {
  return (
    <button
      type="submit"
      className="bg-formBtn uppercase hover:bg-indigo-900 transition-all duration-300 text-loginRegister font-medium rounded-full py-2 w-full px-10 text-lg my-5"
    >
      {children}
    </button>
  );
}

export default ButtonForm;
