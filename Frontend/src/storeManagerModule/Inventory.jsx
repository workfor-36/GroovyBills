import DataTable from "react-data-table-component";

function Inventory() {const columns = [
    {
      name:'Item Name',
      selector:row=>row.name
    },
    {
      name:'Category',
      selector:row=>row.category
    },
    {
      name:'Variant',
      selector:row=>row.variant
    },
    {
      name:'Taxes',
      selector:row=>row.tax
    },
    {
      name:'Discount',
      selector:row=>row.discount
    }
  ];
  const data=[
    {
      id:1,
      name:'n1',
      item:'i1',
      category:'c1',
      variant:'v1',
      tax:'1',
      discount:'0'
    },
    {
      id:2,
      item:'i1',
      category:'c1',
      variant:'v1',
      tax:'1',
      discount:'0'
    }

  ]

  return (
    <div>
     <h1 className="py-2 bg-teal-950 text-white text-center">Store Management</h1>
       <DataTable 
      columns={columns}
        data={data}
        fixedHeader
        pagination
        />
        <button>Restock Store</button>
    </div>
  )
}

export default Inventory;
