import DataTable from "react-data-table-component"
const store=[
  {store:"st2", sale:90, discount:20, cashcollection:20000},
  {store:"st1", sale:88, discount:10, cashcollection:10000},
  {store:"st3", sale:98, discount:130, cashcollection:30200},
  {store:"st4", sale:81, discount:100, cashcollection:1032000},
  
]


function Stores() {
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
  
  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-6 m-1">
<h3 className="text-lg font-semibold mb-4">All Stores Summary</h3>
      <DataTable 
      columns={columns}
        data={store}
        fixedHeader
        pagination
        highlightOnHover
        />
  
    </div>
    </>
  )
}

export default Stores
