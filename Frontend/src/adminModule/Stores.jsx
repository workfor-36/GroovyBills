import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";  // Import js-cookie to handle cookies

function Stores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real store data from the API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        // No need to manually retrieve the token when it's already in the cookie
        // It will automatically be included in the request if `withCredentials` is true.
        const res = await axios.get("http://localhost:4001/api/stores/all-stores", {
          headers: {
            // Token will be automatically sent if `withCredentials` is set to true
            // No need to add the Authorization header manually
          },
          withCredentials: true,  // This ensures cookies are sent with the request
        });

        setData(res.data);  // Update the state with the fetched data
      } catch (error) {
        console.error("❌ Failed to fetch stores:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleEdit = (id, type) => {
    const newEmail = prompt(`Enter new ${type} email:`);
    if (!newEmail) return;

    setData(prev =>
      prev.map(item =>
        item._id === id ? { ...item, [`${type}Email`]: newEmail } : item
      )
    );

    // Optionally call API to update manager or cashier email
    // axios.put(`/api/stores/${id}/update-${type}`, { email: newEmail });
  };

  const columns = [
    { name: 'Store', selector: row => row.storeName },
    { name: 'Manager Name', selector: row => row.managerName },
    { name: 'Manager Email', selector: row => row.managerEmail },
    { name: 'Cashier Name', selector: row => row.cashierName },
    { name: 'Cashier Email', selector: row => row.cashierEmail },
    {
      name: 'Edit Manager Email',
      cell: row => (
        <button
          className="text-blue-600 text-xs underline"
          onClick={() => handleEdit(row._id, "manager")}
        >
          Edit Manager Email
        </button>
      )
    },
    {
      name: 'Edit Cashier Email',
      cell: row => (
        <button
          className="text-blue-600 text-xs underline"
          onClick={() => handleEdit(row._id, "cashier")}
        >
          Edit Cashier Email
        </button>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-1">
      <h3 className="text-lg font-semibold mb-4">All Stores Summary</h3>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}  // Shows a loading spinner while data is being fetched
        fixedHeader
        pagination
        highlightOnHover
      />
    </div>
  );
}

export default Stores;
