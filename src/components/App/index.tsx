import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { ConfigProvider, Button, Input, Flex } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import Table from '../Table';
import CreateModal from '../CreateModal';
import EditModal from '../EditModal';
import DataType from '../../types/DataType';
import calculateSimilarity from '../../api/App'

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [recordForChange, setRecordForChange] = useState<DataType>(null);
  const [dataOfTable, setDataOfTable] = useState<Array<DataType>>([]);
  const [searchRecords, setSearchRecords] = useState<Array<DataType>>([]);

  const showCreateModal = (value: boolean) => {
    setIsCreateModalOpen(value);
  };
  const showEditModal = (value: boolean) => {
    setIsEditModalOpen(value);
    setRecordForChange(null);
  };
  const setSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.trim());
    searchData(event.target.value.trim());
  };

  const editRecord = (value: DataType) => {
    setRecordForChange(value);
    setIsEditModalOpen(true);
  }
  const addRecordOfData = (record: DataType) => {
    const newRecord: DataType = {
      ...record,
      key: dataOfTable.length !== 0 ? Math.max(...dataOfTable.map(item => item.key)) + 1 : 1,
    };

    setDataOfTable([...dataOfTable, newRecord]);
    searchData(search);
  };
  const editRecordOfData = (record: DataType) => {
    const filteredData = dataOfTable.filter(item => item.key !== record.key);

    setDataOfTable([...filteredData, record]);
    searchData(search);
  };
  const deleteRecordOfData = (key: number) => {
    const filteredData = dataOfTable.filter(item => item.key !== key);

    setDataOfTable(filteredData);
    searchData(search);
  };
  const searchData = (value: string) => {
    const filteredData = dataOfTable.filter(item =>
      calculateSimilarity(value.trim().toLowerCase(), item.name.trim().toLowerCase()) >= 0.5
    );

    setSearchRecords(filteredData);
  };

  return (
    <ConfigProvider locale={ruRU}>
      {isCreateModalOpen && (
        <CreateModal showModal={showCreateModal} addRecord={addRecordOfData} />
      )}
      {isEditModalOpen && (
        <EditModal recordForChange={recordForChange} showModal={showEditModal} editRecord={editRecordOfData} />
      )}
      <Flex gap="middle" vertical>
        <Input.Search placeholder="введите имя" onSearch={searchData} onChange={setSearchInput} />
        <Button type="primary" onClick={() => showCreateModal(true)}>Добавить запись</Button>
        <Table data={search.length !== 0 ? searchRecords : dataOfTable} editRecord={editRecord} deleteRecord={deleteRecordOfData} />
      </Flex>
    </ConfigProvider>
  );
}

const root = createRoot(document.getElementById('root'));

root.render(<App />);