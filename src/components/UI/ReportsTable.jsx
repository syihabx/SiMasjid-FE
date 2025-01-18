import React from 'react'

const ReportsTable = ({ reports, columns }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(value);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th 
                key={col.accessor}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reports.map((report) => (
            <tr key={report.id}>
              {columns.map((col) => (
                <td 
                  key={col.accessor}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {col.accessor === 'reportDate' 
                    ? new Date(report[col.accessor]).toLocaleDateString('id-ID')
                    : col.accessor === 'income' || col.accessor === 'expense' || col.accessor === 'balance'
                    ? formatCurrency(report[col.accessor])
                    : report[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportsTable
