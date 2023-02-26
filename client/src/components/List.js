
import React from 'react'
import { useParams } from 'react-router-dom'
import ListIDFetch from './ListIDFetch'

const List = () => {

  let {list} = useParams()

  return (
    <>
        <ListIDFetch list={list} />
    </>
  )
}

export default List