import React from 'react'
import DataTable from 'react-data-table-component';

function Inventory() {
  const columns = [
    {
      name:'Item Name',
      selector:row=>row.name
    },
    {
      name:'Category',
      selector:row=>row.category
    },
    {
      name:'Yesterday',
      selector:row=>row.yesterday
    },
    {
      name:'Today',
      selector:row=>row.today
    }
  ];
  const data=[
    {
       id:1,
      name:'item1',
      category:'--',
      yesterday:'0',
      today:'0'
    },
    {
      id:2,
     name:'item1',
      category:'--',
      yesterday:'0',
      today:'0'
    }
  ]
  return (
    <>
    <div>
      <h1 className='text-center py-2 bg-teal-950 text-white'>Consumption report</h1>
    <DataTable 
      columns={columns}
        data={data}
        fixedHeader
        pagination
        />
    </div>
    <div className='text-center'>Low Stock Report</div>
    </>
  )
}

export default Inventory
