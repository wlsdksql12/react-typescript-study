import { useState } from "react";

export default function Radio() {
  const [formState, setFormState] = useState({
    gender: "male",
    color: "red",
  });

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formState.gender === "male"}
              onChange={handleRadioChange}
            />
            male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formState.gender === "female"}
              onChange={handleRadioChange}
            />
            female
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="color"
              value="red"
              checked={formState.color === "red"}
              onChange={handleRadioChange}
            />
            red
          </label>
          <label>
            <input
              type="radio"
              name="color"
              value="blue"
              checked={formState.color === "blue"}
              onChange={handleRadioChange}
            />
            blue
          </label>
        </div>
      </form>
    </>
  );
}
