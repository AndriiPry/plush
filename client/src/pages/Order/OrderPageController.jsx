import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import OrderPage from './OrderPage'
import { callApiAction } from '../../redux/actions/commonAction'

function OrderPageController({id}) {
    const [state, setState] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const fetchList = () => {
        // setLoading(true)
        // dispatch(callApiAction(
            // async () => await fetchTeamMemberByIdApi({ id }),
            // (response) => {
                // setState(response)
                // setLoading(false)
            // },
            // (err) => {
                // setLoading(false)
            // }
        // ))
    }
    useEffect(() => {
        fetchList()
    },[])

  return (
    <OrderPage setState={setState} loading={loading} state={state}  />
  )
}

export default OrderPageController