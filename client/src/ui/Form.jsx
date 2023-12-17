function Form({ children, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg w-1/5 flex flex-col items-center gap-6 bg-loginRegister py-6 px-12"
    >
      {children}
    </form>
  );
}

export default Form;
