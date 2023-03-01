import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface FormDataInterface {
  toDo: string
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<FormDataInterface>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const handleValid = ({ toDo }: FormDataInterface) => {
    setValue("toDo", "");
    setToDos((current) => [{
      text: toDo,
      category,
      id: Date.now()
    }, ...current
    ]);
  };

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please Write toDo",
        })}
        placeholder="write a to do"
      />
      <button>add</button>
    </form>
  );
}

export default CreateToDo;