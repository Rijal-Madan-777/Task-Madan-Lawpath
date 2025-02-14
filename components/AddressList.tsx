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
        {data?.map((item: any) => (
          <div key={item.id} className="address-list-item">
            <p>
              <span>State</span> : {item?.state}
            </p>
            <p>
              <span>Postcode</span> : {item?.postcode}
            </p>
            <p>
              <span>Latitude</span> : {item?.latitude}
            </p>
            <p>
              <span>Longitude</span> : {item?.longitude}
            </p>
            <p>
              <span>location</span> : {item?.location}
            </p>
            <p>
              <span>Category</span> : {item?.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddressList
