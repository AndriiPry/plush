import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderPage from './OrderPage'
import { callApiAction } from '../../redux/actions/commonAction'
import {getUsersOrder} from '../../api/order.api'

function OrderPageController({id}) {
    const [state, setState] = useState()
    const [loading, setLoading] = useState(false)
    const {user} = useSelector(state => state)
    const dispatch = useDispatch()

    const fetchList = () => {
        setLoading(true)
        dispatch(callApiAction(
            async () => await getUsersOrder( user?.data?.user?.id, user?.data?.jwt ),
            (response) => {
                setState(response)
                setLoading(false)
            },
            (err) => {
                setLoading(false)
            }
        ))
    }
    useEffect(() => {
        fetchList()
    },[])

  return (
    <OrderPage setState={setState} loading={loading} state={state}  />
  )
}

export default OrderPageController