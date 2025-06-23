import DataTable from "react-data-table-component";

function Report() {
  const columns = [
    {
      name:'Store',
      selector:row=>row.store
    },
    {
      name:'Total Sale',
      selector:row=>row.sale
    },
    {
      name:'Discount',
      selector:row=>row.discount
    },
    {
      name:'Total Cash Collected',
      selector:row=>row.cashcollection
    }
  ];
  const data=[
    {
      id:1,
      store:'St1',
      sale:'0',
      discount:'0',
      cashcollection:'0'
    },
    {
      id:2,
      store:'St2',
      sale:'0',
      discount:'0',
      cashcollection:'0'
    }

  ]
  return (
    <div>
    <h1 className='text-center py-2 bg-teal-950 text-white'>Day End Summary</h1>
     <DataTable 
      columns={columns}
        data={data}
        fixedHeader
        pagination
        />

    </div>
  )
}

export default Report
