/* eslint-disable react/prop-types */

const DashboardTableComponent = ({ headers, rows }) => {
  return (
    <table className="tableLayout text-white my-4">
      <thead>
        <tr className="border-white border">
          {headers.map((header, index) => (
            <th key={index} className="p-1 border border-white">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {console.log(rows)}
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-white border">
            <td className="p-1 border border-white">{row?.name}</td>
            <td className="p-1 border border-white">{row?.description}</td>
            <td className="p-1 border border-white">{row?.price}</td>
            <td className="p-1 border border-white">
              {row?.inStock ? "Yes" : "No"}
            </td>
            <td className="p-1 border border-white">
              {row?.categoryInfo?.category}
            </td>
            <td className="p-1 border border-white">
              {row?.userInfo?.userName}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DashboardTableComponent;
