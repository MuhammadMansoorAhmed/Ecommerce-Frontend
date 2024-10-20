/* eslint-disable react/prop-types */

const DashboardTableComponent = ({ headers, rows }) => {
  return (
    <table className="tableLayout text-white my-4">
      <thead>
        <tr className="border-white border">
          {headers?.map((header, index) => (
            <th key={index} className="p-1 border border-white">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(rows) && rows.length > 0 ? (
          rows?.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-white border">
              <td className="p-1 border border-white ">{row?.category}</td>
              <td className="p-1 border border-white">{row?.inStock}</td>
              <td className="p-1 border border-white">{row?.outOfStock}</td>
              <td className="p-1 border border-white">{row?.totalProducts}</td>
              <td className="p-1 border border-white">{row?.totalSales}</td>
            </tr>
          ))
        ) : (
          <tr key={0} className="border-white border">
            <td className="p-1 border border-white">No Data Found</td>
            <td className="p-1 border border-white">No data found</td>
            <td className="p-1 border border-white">No data found</td>
            <td className="p-1 border border-white">No data found</td>
            <td className="p-1 border border-white">No data found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DashboardTableComponent;
