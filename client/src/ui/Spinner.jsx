import { MoonLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-formBack">
      <MoonLoader color="#3e4684" size="80" />
    </div>
  );
}

export default Spinner;
