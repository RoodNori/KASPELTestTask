import { Modal, DatePicker, Form, Input, InputNumber } from "antd";
import { useState } from 'react';
import DataType from '../../types/DataType';

interface IProps {
    showModal: (value: boolean) => void;
    addRecord: (record: DataType) => void;
}

function CreateModal({ showModal, addRecord }: IProps) {
    const [form] = Form.useForm();
    const [activeOkButton, setActiveOkButton] = useState(true);
    const [loadingOkButton, setLoadingOkButton] = useState(false);

    const submitForm = () => {
        setLoadingOkButton(true);

        const recordRaw = form.getFieldsValue();
        const record: DataType = {
            ...recordRaw,
            birthday: recordRaw.birthday.toDate(),
        };

        addRecord(record);
        showModal(false);
    };

    const setOkButtonActive = () => {
        if (form.isFieldsTouched(true) && form.getFieldsError().every(({ errors }) => errors.length === 0))
            setActiveOkButton(false);
        else setActiveOkButton(true);
    };

    return (
        <Modal
            open={true}
            closeIcon={false}
            okButtonProps={{ disabled: activeOkButton, loading: loadingOkButton }}
            onOk={submitForm}
            onCancel={() => showModal(false)}
        >
            <Form
                form={form}
                onFieldsChange={setOkButtonActive}
            >
                <Form.Item<DataType> label="Имя" name="name"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<DataType> label="Возраст" name="age"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item<DataType> label="День рождения" name="birthday"
                    rules={[{ required: true, message: 'Please input!' }]}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateModal;