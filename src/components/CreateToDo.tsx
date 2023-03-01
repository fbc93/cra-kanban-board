import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface FormDataInterface {
  toDo: string
}

//styled
const TodoForm = styled.form`
  width: 100%;
  background-color: #dfe4ea;
  padding: 20px;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;

  input {
    width: calc(100% - 80px);
    display: inline-block;
    border:none;
    padding:10px;
    font-size: 18px;
    color:#333333;

    &:focus {
      outline-color: #badc58;
    }
  }

  button {
      width: 70px;
      display: inline-block;
    }
`;



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
    <TodoForm onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please Write toDo",
        })}
        placeholder="write a to do"
      />
      <button>add</button>
    </TodoForm>
  );
}

export default CreateToDo;