import { useState } from 'react';
import CRUDContainer from '../../components/crud/CRUDContainer';
import useApi from '../../hooks/api/useApi';

const DailyTaskCRUDPage = () => {

  const columns = [
    { field: 'title', header: 'Judul' },
    { field: 'description', header: 'Deskripsi' },
    { 
      field: 'dueDate', 
      header: 'Tanggal Jatuh Tempo',
      format: (value) => new Date(value).toLocaleDateString('id-ID')
    },
    { 
      field: 'completed', 
      header: 'Status', 
      format: (value) => value ? 'Selesai' : 'Belum Selesai' 
    }
  ];

  const fields = [
    { name: 'title', label: 'Judul', type: 'text', required: true },
    { name: 'description', label: 'Deskripsi', type: 'textarea' },
    { 
      name: 'dueDate', 
      label: 'Tanggal Jatuh Tempo', 
      type: 'date', 
      required: true,
      dateFormat: 'YYYY-MM-DD',
      datePickerProps: {
        dateFormat: 'yyyy-MM-dd',
        showYearDropdown: true,
        yearDropdownItemNumber: 100,
        minDate: new Date(1900, 0, 1),
        maxDate: new Date(2100, 11, 31)
      }
    },
    { 
      name: 'completed', 
      label: 'Status', 
      type: 'checkbox',
      defaultChecked: false
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Tugas Harian</h1>
      <CRUDContainer
        entity="DailyTasks"
        columns={columns}
        fields={fields}
      />
    </div>
  );
};

export default DailyTaskCRUDPage;
