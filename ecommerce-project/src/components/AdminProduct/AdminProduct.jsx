import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { WrapperHeader } from './style'
import React, { useState, useEffect, useRef } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import InputComponent from '../InputComponent/InputComponent'
import { WrapperUploadFile } from '../AdminUser/style'
import { getBase64, renderOptions } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import * as message from '../../components/Message/Message'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminProduct = () => {
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        descriptions: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: '',
        discount: ''
    })
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        discount: ''
    })

    const searchInput = useRef(null)
    const [form] = Form.useForm()
    const [formDetails] = Form.useForm()

    const mutation = useMutationHooks(
        (data) => {
            const { name,
                price,
                description,
                rating,
                image,
                type,
                countInStock,
                discount } = data
            const res = ProductService.createProduct({
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock,
                discount
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = ProductService.updateProduct(
                id,
                token,
                { ...rests })
            return res
        },
    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = ProductService.deleteProduct(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token, ...ids
            } = data
            const res = ProductService.deleteManyProduct(
                ids,
                token)
            return res
        },
    )

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                discount: res?.data?.discount,
            })
        }

    }

    useEffect(() => {
        const { image, ...rest } = stateProductDetails
        formDetails.setFieldsValue(rest)
    }, [formDetails, stateProductDetails])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsProduct = () => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
        setIsOpenDrawer(true)
    }
    const handleDeleteManyProducts = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct({ limit: 100 })
        return res
    }
    const { isPending } = mutation
    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany
    const queryProduct = useQuery({ queryKey: ['product'], queryFn: getAllProducts })
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
    const { isPending: isLoadingProduct, data: products } = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 'var(--font-size-2xl)' }}
                    onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', cursor: 'pointer', fontSize: 'var(--font-size-2xl)', marginLeft: '8px' }}
                    onClick={handleDetailsProduct}
                />
            </div>
        )
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={() => {
                            close()
                        }}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? 'var(--color-primary-hover)' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3
            },
        },

        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: renderAction
        },
    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessDelectedMany])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
            queryProduct.refetch()
        } else if (isErrorDeleted) {
            message.error()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessDeleted])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: ''
        })
        formDetails.resetFields()
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccessUpdated])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModelOpen(false)
        setStateProduct({
            name: '',
            price: '',
            descriptions: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields()
    }
    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            discount: stateProduct.discount
        }
        mutation.mutate(params, {
            onSuccess: () => {
                message.success()
                handleCancel()
            },
            onError: () => {
                message.error()
            },
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }
    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }
    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
    }
    return (
        <div>
            <WrapperHeader>Manage Products</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: 'var(--radius-sm)', borderStyle: 'dashed' }}
                    onClick={() => setIsModelOpen(true)}>
                    <PlusOutlined style={{ fontSize: 'var(--font-size-3xl)' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyProducts} columns={columns} isLoading={isLoadingProduct} data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id)
                            }
                        }
                    }}
                />
            </div>
            <ModalComponent title="Create Product" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        form={form}
                        onFinish={onFinish}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <Select
                                name="type"
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(typeProduct?.data?.data)}
                            />
                        </Form.Item>
                        {stateProduct.type === 'add_type' && (
                            <Form.Item
                                label='New type'
                                name="newType"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
                            </Form.Item>
                        )}
                        <Form.Item
                            label="count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your rating!' }]}
                        >
                            <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of product!' }]}
                        >
                            <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                            rules={[{ required: true, message: 'Please input your count image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}>
                                <Button >Select File</Button>
                                {stateProduct?.image && (
                                    <img src={stateProduct?.image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item >
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
            <DrawerComponent title='Product detail' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isLoading={isLoadingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onUpdateProduct}
                        autoComplete="on"
                        form={formDetails}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateProductDetails.name} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateProductDetails.type} onChange={handleOnchangeDetails} name="type" />
                        </Form.Item>

                        <Form.Item
                            label="count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                            <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your rating!' }]}
                        >
                            <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>

                        <Form.Item
                            label="Discount"
                            name="discount"
                            rules={[{ required: true, message: 'Please input your discount of product!' }]}
                        >
                            <InputComponent value={stateProductDetails.discount} onChange={handleOnchangeDetails} name="discount" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1} beforeUpload={() => false}>
                                <Button >Select File</Button>
                                {stateProductDetails?.image && (
                                    <img src={stateProductDetails?.image} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item >
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Delete Product" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                <Loading isLoading={isLoadingDeleted}>
                    <div>Are you sure to delete this product?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default AdminProduct