import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, FilePlus2 } from "lucide-react";

function AddPedido({ api_url, setPedidos }) {
  const [toggleForm, setToggleForm] = useState(false);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      clienteNome: "",
      itens: [{ nome: "", quantidade: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  function toggleFormVisibility() {
    setToggleForm(!toggleForm);
  }

  async function onSubmit(pedidos) {
    try {
      const response = await fetch(api_url, {
        method: "POST",
        body: JSON.stringify(pedidos),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || "Falha ao adicionar novo pedido!");
      }

      setPedidos((prev) => [...prev, data]);
      reset();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div className="flex justify-start mb-8">
        <button
          type="button"
          className="flex flex-row gap-2 font-bold"
          onClick={toggleFormVisibility}
        >
          <FilePlus2 />
          <h2>Adicionar Pedido</h2>
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${
          toggleForm ? "flex" : "hidden"
        } flex-col gap-5 bg-purple-600 rounded-lg p-8 w-[500px] shadow-lg`}
      >
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder={`Item ${index + 1}`}
              {...register(`itens.${index}.nome`, {
                required: "O item é obrigatório",
              })}
              className="flex-1 bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="number"
              min={1}
              placeholder="Qtd"
              {...register(`itens.${index}.quantidade`, {
                required: "Qtd obrigatória",
                min: 1,
              })}
              className="w-20 bg-purple-700 text-white px-3 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-300 hover:text-red-500"
            >
              {fields.length > 1 && <Trash2 />}
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ nome: "", quantidade: "" })}
          className="flex items-center gap-2 text-white font-semibold hover:text-purple-200"
        >
          <Plus /> Adicionar outro item
        </button>

        <input
          type="text"
          placeholder="Nome do cliente"
          {...register("clienteNome", {
            required: "Nome do cliente é obrigatório",
          })}
          className="bg-purple-700 text-white px-4 py-3 rounded-md border border-purple-500 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md px-6 py-3 transition-colors duration-200"
        >
          Adicionar Pedido
        </button>
      </form>
    </div>
  );
}

export default AddPedido;
