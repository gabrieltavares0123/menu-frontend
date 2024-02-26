import { useEffect, useState } from "react"
import "./modal.css"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate"
import { FoodData } from "../../interface/FoodData"

interface InputProps {
    label: string,
    value: string | number,
    updatedValue(value: any): void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updatedValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updatedValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isPending } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }
        mutate(foodData)
    }

    useEffect(() => {
        if (!isSuccess) return
        closeModal()
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no menu</h2>
                <form className="input-container">
                    <Input label="title" value={title} updatedValue={setTitle} />
                    <Input label="price" value={price} updatedValue={setPrice} />
                    <Input label="image" value={image} updatedValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'Postando...' : 'Postar'}
                </button>
            </div>
        </div>
    )
}