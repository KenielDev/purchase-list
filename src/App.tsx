import { FormEvent, useState } from "react";
import "./App.css";
import { ItemList, ItemProps } from "./components/Typography/ItemList";
import { Input } from "./components/Input/Input";
import Header from "./components/Layout/Header";
import { Button } from "./components/Button/Button";

function App() {
  const [itemsList, setItemsList] = useState<ItemProps[]>([]);

  const initialState: ItemProps = {
    itemName: "",
    quantity: "",
  };

  const [itemData, setItemData] = useState<ItemProps>(initialState);

  const handleInputChange = (field: any, value: string | number) => {
    setItemData({ ...itemData, [field]: value });
  };

  const incrementItemInList = () => {
    setItemsList((prevstate: ItemProps[]) => [...prevstate, itemData]);
  };

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { itemName, quantity } = itemData;

    if (itemName === "" || quantity === "") {
      alert("Vazio não pode");
    } else {
      incrementItemInList();
      setItemData(initialState);
    }
  }

  const removeItem = (index: number) => {
    setItemsList((oldValues) => {
      return oldValues.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="p-4 max-w-xl grid gap-4">
      <Header />
      {itemsList.map(({ itemName, quantity }, index) => (
        <ul className="list-disc px-4">
          <ItemList
            removeItem={() => removeItem(index)}
            itemName={itemName}
            quantity={quantity}
          />
        </ul>
      ))}

      <form onSubmit={submitForm} className="grid gap-2">
        <Input
          value={itemData.itemName}
          label="Nome do item"
          onChange={(event) =>
            handleInputChange("itemName", event.target.value)
          }
        />
        <Input
          value={itemData.quantity}
          type="number"
          label="Quantidade"
          onChange={(event) =>
            handleInputChange("quantity", event.target.value)
          }
        />
        <Button>Adicionar</Button>
      </form>
    </div>
  );
}

export default App;
