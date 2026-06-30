import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/inputForm/inputForm'
import { WrapperAvatarSection, WrapperCard, WrapperContainer, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            return UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const { isPending, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
    }

    const renderUpdateButton = () => (
        <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
                height: '32px',
                width: 'fit-content',
                background: '#fff',
                border: '1px solid rgb(26, 148, 255)',
                borderRadius: '6px',
                padding: '0 14px',
                flexShrink: 0
            }}
            textButton={'Update'}
            styleTextButton={{ color: 'rgb(26, 148, 255)', fontSize: '13px', fontWeight: '600' }}
        ></ButtonComponent>
    )

    return (
        <WrapperContainer>
            <div style={{ boxSizing: 'border-box', padding: '24px 120px 24px', maxWidth: '1300px', margin: '0 auto' }}>
                <h3 style={{ fontWeight: 700, color: '#333' }}>User Profile</h3>
                <Loading isLoading={isPending}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperCard>
                            <WrapperAvatarSection>
                                {avatar ? (
                                    <img src={avatar} style={{
                                        height: '88px',
                                        width: '88px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '3px solid #fff',
                                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)'
                                    }} alt="avatar" />
                                ) : (
                                    <div style={{
                                        height: '88px',
                                        width: '88px',
                                        borderRadius: '50%',
                                        background: '#e8e8e8'
                                    }} />
                                )}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                        <Button icon={<UploadOutlined />} size="small">Select File</Button>
                                    </WrapperUploadFile>
                                    {renderUpdateButton()}
                                </div>
                            </WrapperAvatarSection>
                            <WrapperInput>
                                <WrapperLabel htmlFor="name">Name</WrapperLabel>
                                <InputForm style={{ flex: 1 }} id="name" value={name} onChange={handleOnchangeName} />
                                {renderUpdateButton()}
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="email">Email</WrapperLabel>
                                <InputForm style={{ flex: 1 }} id="email" value={email} onChange={handleOnchangeEmail} />
                                {renderUpdateButton()}
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                                <InputForm style={{ flex: 1 }} id="phone" value={phone} onChange={handleOnchangePhone} />
                                {renderUpdateButton()}
                            </WrapperInput>
                            <WrapperInput>
                                <WrapperLabel htmlFor="address">Address</WrapperLabel>
                                <InputForm style={{ flex: 1 }} id="address" value={address} onChange={handleOnchangeAddress} />
                                {renderUpdateButton()}
                            </WrapperInput>
                        </WrapperCard>
                    </div>
                </Loading>
            </div>
        </WrapperContainer>
    )
}

export default ProfilePage