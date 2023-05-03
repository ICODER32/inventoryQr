import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './EditItem.css'
const EditItem = () => {
    const [updateForm, setUpdateForm] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [itemid, setItemId] = useState('')
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const getItems = async () => {
        const response = await axios.get('/api/items')
        setItems(response.data.data)
        setLoading(false)
    }

    useEffect(() => {
        getItems()
    })
    const handleUpdate = async (id) => {
        setUpdateForm(!updateForm)
        setItemId(id)
        try {

            const data = await axios.get(`/api/items/${id}`)
            setItemName(data.data.data.name)
            setItemPrice(data.data.data.totalItems)
        } catch (error) {

        }
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`/api/items/edit`, { name: itemName, id: itemid, totalItems: itemPrice })
            setUpdateForm(!updateForm)
            alert('Updated Successfully')
        } catch (error) {

            setUpdateForm(!updateForm)
            alert('Update Failed')
        }

    }
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className='item_main'>
            <h1>Edit Items</h1>

            {items.map(item => {
                return (
                    <div key={item._id} className='item_card'>
                        <div className='item_head'>
                            <h3>{item.name}</h3>
                            <h6>Available Items : {item.items_left}</h6>
                        </div>
                        <div className='item_foot'>
                            <button onClick={() => { handleUpdate(item._id) }} className='update_btn'>Update</button>

                        </div>
                    </div>
                )
            })}
            {
                updateForm &&
                <form onSubmit={handleFormSubmit} className='form_update'>
                    <h2>Update Data</h2>
                    <label htmlFor="">Name</label>
                    <input readOnly value={itemName} className='login-input' type="text" name='name' />
                    <label htmlFor="">Available Amount</label>
                    <input value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} className='login-input' type="number" name='totalItems' />
                    <button className='submit_btn' type="submit">Update</button>
                    <button onClick={() => setUpdateForm(!updateForm)} className='update_btn'>Cancel</button>
                </form>
            }

        </div>
    )
}

export default EditItem