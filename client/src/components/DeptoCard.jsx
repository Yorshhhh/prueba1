
import React from 'react'

function DeptoCard() {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      <a>ID: {user.id}</a>

      <h1 className="text-xl fond-bold capitalize">RUT: {user.rut}</h1>

      <p className="text-gray-500 text-sm text-center">
        Password: {user.password}
      </p>
    </div>
  )
}

export default DeptoCard