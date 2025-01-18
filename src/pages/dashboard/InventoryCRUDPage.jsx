import { useState } from 'react';
import CRUDContainer from '../../components/crud/CRUDContainer';
import useApi from '../../hooks/api/useApi';

const InventoryCRUDPage = () => {

  const columns = [
    { field: 'name', header: 'Nama Barang' },
    { field: 'description', header: 'Deskripsi' },
    { field: 'quantity', header: 'Jumlah' },
    { field: 'price', header: 'Harga', format: (value) => `Rp${value.toLocaleString()}` },
    { field: 'category', header: 'Kategori' },
    { field: 'isActive', header: 'Status', format: (value) => value ? 'Aktif' : 'Nonaktif' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Inventaris</h1>
      <CRUDContainer
        entity="inventory"
        columns={columns}
        fields={[
          { name: 'name', label: 'Nama Barang', type: 'text', required: true },
          { name: 'description', label: 'Deskripsi', type: 'textarea' },
          { name: 'quantity', label: 'Jumlah', type: 'number', required: true, transform: (value) => Number(value) },
          { name: 'price', label: 'Harga', type: 'number', required: true },
          { name: 'category', label: 'Kategori', type: 'text' },
          { name: 'isActive', label: 'Status', type: 'checkbox', defaultChecked: true }
        ]}
      />
    </div>
  );
};

export default InventoryCRUDPage;
