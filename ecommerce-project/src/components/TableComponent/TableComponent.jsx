import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data: dataSource = [], isLoading = false, columns = [], handleDeleteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const newColumnExport = useMemo(() => {
    return columns
      ?.filter((col) => col.dataIndex !== 'action' && col.dataIndex !== 'Action')
      ?.map(({ title, dataIndex }) => ({ title, dataIndex }))
  }, [columns])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
  };
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <Loading isLoading={isLoading}>
      {!!rowSelectedKeys.length && !!handleDeleteMany && (
        <div style={{
          background: '#1d1ddd',
          color: 'var(--color-white)',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer'
        }}
          onClick={handleDeleteAll}
        >
          Delete all
        </div>
      )}
      <button onClick={exportExcel}>Export Excel</button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  )
}

export default TableComponent