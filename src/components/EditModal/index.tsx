import { Modal, DatePicker, Form, Input, InputNumber } from "antd";
import * as dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import DataType from '../../types/DataType';

interface IProps {
    recordForChange: DataType;
    showModal: (value: boolean) => void;
    editRecord: (record: DataType) => void;
}

function EditModal({ recordForChange, showModal, editRecord }: IProps) {
    const [form] = Form.useForm();
    const [activeOkButton, setActiveOkButton] = useState(true);
    const [loadingOkButton, setLoadingOkButton] = useState(false);

    const submitForm = () => {
        setLoadingOkButton(true);

        const recordRaw = form.getFieldsValue();
        const record: DataType = {
            ...recordRaw,
            birthday: recordRaw.birthday.toDate(),
            key: recordForChange.key,
        };

        editRecord(record);
        showModal(false);
    };

    const setOkButtonActive = () => {
        if (form.isFieldsTouched(true) && form.getFieldsError().every(({ errors }) => errors.length === 0))
            setActiveOkButton(false);
        else setActiveOkButton(true);
    };


    useEffect(() => {
        form.setFieldsValue({ name: recordForChange?.name, age: recordForChange?.age, birthday: dayjs(recordForChange.birthday) });
    }, [])

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
                    rules={[{ required: true, message: 'Заполните поле!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<DataType> label="Возраст" name="age"
                    rules={[{ required: true, message: 'Заполните поле!' }]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item<DataType> label="День рождения" name="birthday"
                    rules={[{ required: true, message: 'Заполните поле!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const enteredAge = getFieldValue('age');

                            if (!value || !enteredAge) {
                                return Promise.resolve();
                            }

                            const today = new Date();
                            const birthDate = value.toDate();

                            let yDiff = today.getFullYear() - birthDate.getFullYear();
                            const mDiff = today.getMonth() - birthDate.getMonth();

                            if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) {
                                yDiff--;
                            }

                            return yDiff === enteredAge
                                ? Promise.resolve()
                                : Promise.reject(new Error('Дата рождения не соответствует возрасту'));
                        },
                    }),
                    ]}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditModal;