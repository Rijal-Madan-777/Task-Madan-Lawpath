import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Locality } from '@/Constant/Types'

type addressListProps = {
  data: Locality[]
}

function AddressList({ data }: addressListProps) {
  return (
    <div className="address">
      <h2>
        {' '}
        <Icon icon="bitcoin-icons:address-book-outline" width="24" height="24" /> Address List
      </h2>
      <div className="address-list">
        {data?.map((item: Locality) => (
          <div key={item.id} className="address-list-item">
            <p>State : {item?.state}</p>
            <p>Postcode : {item?.postcode}</p>
            <p>Latitude : {item?.latitude}</p>
            <p>Longitude : {item?.longitude}</p>
            <p>location : {item?.location}</p>
            <p>Category : {item?.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddressList
