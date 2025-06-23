import DataTable from "react-data-table-component";
import { useState } from 'react';

function CreateZone() {
const [showForm, setShowForm] = useState(false);

  const columns = [
    {
      name:'Outlet Name',
      selector:row=>row.name
    },
    {
      name:'Address',
      selector:row=>row.address
    },
    {
      name:'Store Manager',
      selector:row=>row.manager
    },
    {
      name:'Cashier',
      selector:row=>row.cashier
    }
  ];
  const data=[
    {
      id:1,
      name:'st1',
      address:'ad1',
      manager:'m1',
      cashier:'c1'
    },
    {
      id:2,
      name:'st2',
      address:'ad2',
      manager:'m2',
      cashier:'c2'
    }

  ]
  return (
    <div >
      <h1 className='text-center py-2 bg-teal-950 text-white'>Outlets List</h1>
      <DataTable 
      columns={columns}
        data={data}
        fixedHeader
        pagination
        />
        <div className="mt-6">
  <button
    className="bg-teal-950 text-white py-2 px-4 rounded-md shadow-lg"
    onClick={() => setShowForm(true)}
  >
    Create New Store
  </button>

  {showForm && (
    <div className="mt-4 p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Submit Details</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // handle form submission here
          setShowForm(false); // hide form after submit
        }}
      >
        <div className="mb-2">
          <label className="block mb-1">Name</label>
          <input type="text" className="border px-2 py-1 w-full rounded" required />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Email</label>
          <input type="email" className="border px-2 py-1 w-full rounded" required />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )}
</div>
    </div>
  )
}

export default CreateZone
