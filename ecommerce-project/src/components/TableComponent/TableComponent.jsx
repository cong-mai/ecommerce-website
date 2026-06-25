import { Table } from 'antd';
import React from 'react'
import Loading from '../../components/LoadingComponent/Loading'
// import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  
  const { selectionType = 'checkbox', data = [], isPending = false,
    columns = [] } = props

  const rowSelection = {
    onChange: () => {},
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <Loading isLoading={isPending}>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
      </Loading>
  )
}

export default TableComponent