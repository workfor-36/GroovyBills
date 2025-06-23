import React from 'react'

function AdminDashBoard() {
  
  return (
    <>
    <div className='m-4 grid grid-cols-3 gap-4'>
      <div className='h-72 border-2 text-center '>Total Sales</div>
      <div className='h-72 border-2 text-center'>No. of orders</div>
      <div className='h-72 border-2 text-center'>cash Collection</div>
      <div className='h-72 border-2 text-center'>Taxes</div>
    </div>
    <div className="h-72 border-2 text-center">Low Selling Products</div>
    <div className="h-72 border-2 text-center">Top Selling products</div>
    </>
  )
}

export default AdminDashBoard
