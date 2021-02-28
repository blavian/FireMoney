import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../store/reducers/budget"
import { hideTransactionModal } from "../store/reducers/modal"

function TransactionForm() {

    const dispatch = useDispatch();
    const itemId = useSelector((x) => x.transactionModal.id)

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const newTransaction = {
            title,
            amount,
            itemId: itemId,
            date
        }
        dispatch(createTransaction(newTransaction));
        dispatch(hideTransactionModal())
    };

    return (
        <form className="form_modal transaction_modal" onSubmit={onSubmit}>
            <div className="form_modal_div">
                <h2>New Transaction</h2>
            </div>
            <div className="form_modal_div" >
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Walmart"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                ></input>
            </div>
            <div className="form_modal_div" >
                <label>Amount</label>
                <input
                    type="text"
                    name="amount"
                    placeholder="$32.32"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                ></input>
            </div>
            <div className="form_modal_div" >
                <label>Due Date</label>
                <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required={true}
                ></input>
            </div>
            <div className="form_modal_div" >
                <button className="modal_button" type="submit">Submit</button>
            </div>
        </form>
    );
}


export default TransactionForm;