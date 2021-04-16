import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../../store/reducers/budget"
import { hideTransactionModal } from "../../store/reducers/modal"
import * as sessionActions from "../../store/reducers/session"
import moment from 'moment';

function TransactionForm() {

    const dispatch = useDispatch();
    
    const user = useSelector((x) => x.session.user)
    const itemId = useSelector((x) => x.transactionModal.id)

    let newDate = Date.now()
    newDate = moment(newDate).format("YYYY-MM-DD")


    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(newDate);

    const onSubmit = async (e) => {
        e.preventDefault();
        const newTransaction = {
            title,
            amount,
            itemId: itemId,
            date
        }
        await dispatch(createTransaction(newTransaction))
        await dispatch(hideTransactionModal())
        await dispatch(sessionActions.getUserTransactions(user.id))
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
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                ></input>
            </div>
            <div className="form_modal_div" >
                <label>Amount</label>
                <input
                    type="text"
                    name="amount"
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
