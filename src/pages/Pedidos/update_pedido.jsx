import { forwardRef, useState, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import { Plus, Trash2, X } from "lucide-react";

const AtualizarPedido = forwardRef(({ onSubmit }, ref) => {
  const [open, setOpen] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);

  const { register, control, handleSubmit, reset, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  useImperativeHandle(ref, () => ({
    open: (pedido) => {
      setCurrentPedido(pedido);
      setValue("clienteNome", pedido.clienteNome);
      setValue("itens", pedido.itens);
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onFormSubmit = (data) => {
    const pedidoAtualizado = {
      ...currentPedido,
      clienteNome: data.clienteNome,
      itens: data.itens,
      data: new Date().toISOString(),
    };

    onSubmit(pedidoAtualizado);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center bg-purple-600 text-white">
        <span>Editar Pedido #{currentPedido?.id}</span>
        <IconButton onClick={handleClose} className="text-white">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent className="p-6">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <input
              {...register("clienteNome", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Itens do Pedido
            </label>
            {fields.map((item, index) => (
              <div key={item.id} className="flex space-x-2 items-center">
                <input
                  {...register(`itens.${index}.nome`, { required: true })}
                  placeholder="Nome do item"
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="number"
                  min="1"
                  {...register(`itens.${index}.quantidade`, {
                    required: true,
                    min: 1,
                  })}
                  placeholder="Quantidade"
                  className="w-20 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ nome: "", quantidade: 1 })}
              className="mt-2 flex items-center text-sm text-purple-600 hover:text-purple-800"
            >
              <Plus size={16} className="mr-1" /> Adicionar Item
            </button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outlined"
              onClick={handleClose}
              className="border-gray-300 text-gray-700"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default AtualizarPedido;
