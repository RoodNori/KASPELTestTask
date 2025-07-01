import { Table, Space, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DataType from '../../types/DataType';

interface IProps {
  data: DataType[];
  editRecord: (record: DataType) => void;
  deleteRecord: (key: number) => void;
}

function SortedTable({ data, editRecord, deleteRecord }: IProps) {
  const { Column, ColumnGroup } = Table;

  const convertDateToString = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
    <Table<DataType>
      dataSource={data}
      showSorterTooltip={{ target: 'sorter-icon' }}
    >
      <Column title="Имя" dataIndex="name" key="name"
        ellipsis={true}
        sorter={(a: DataType, b: DataType) => a.name.length - b.name.length} />
      <Column title="Возраст" dataIndex="age" key="age"
        sorter={(a: DataType, b: DataType) => a.age - b.age} />
      <Column title="День рождения" dataIndex="birthday" key="birthday"
        sorter={(a: DataType, b: DataType) => a.birthday.getTime() - b.birthday.getTime()}
        render={(_: any, record: DataType) => (
          convertDateToString(record.birthday)
        )} />
      <Column title="Действия" dataIndex="action" key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <Tooltip title="изменить запись">
              <Button type="primary" shape="circle" icon={<EditOutlined />}
                onClick={() => editRecord(record)}
              />
            </Tooltip>
            <Tooltip title="удалить запись">
              <Button type="primary" shape="circle" icon={<DeleteOutlined />}
                onClick={() => deleteRecord(record.key)}
              />
            </Tooltip>
          </Space>
        )} />
    </Table>
  );
}

export default SortedTable;