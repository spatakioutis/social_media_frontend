import { useState } from 'react'

import PageHeader from '../components/page-header/PageHeader.jsx'
import ChangeProfilePic from '../components/settings/ChangeProfilePic.jsx'
import ChangePassword from '../components/settings/ChangePassword.jsx'
import ChangeUserInfo from '../components/settings/ChangeUserInfo.jsx'
import DeleteAccountConfirm from '../components/settings/DeleteAccountConfirm.jsx'

import '../styles/pages/SettingsPage.css'

const SettingsPage = () => {

    const [changeInfoModal, setChangeInfoModal] = useState(false)
    const [profPicModal, setProfPicModal] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)

    return (
        <div className='settings--page'>
            <PageHeader />
            <div className="settings--container">
                <h1>Settings</h1>
                <button 
                    id='change---user--info' 
                    type='button'
                    onClick={() => setChangeInfoModal(true)}
                >
                    Change Personal Info
                </button>
                <button 
                    id="change--profPic" 
                    type='button'
                    onClick={() => setProfPicModal(true)}
                >
                    Change Profile Picture
                </button>
                <button 
                    id="change--password" 
                    type='button'
                    onClick={() => setChangePasswordModal(true)}
                >
                    Change Password 
                </button>
                <button 
                    id="delete--account" 
                    type='button'
                    onClick={() => setDeleteConfirmModal(true)}
                >
                    Delete Account
                </button>
            </div>
            { changeInfoModal     && <ChangeUserInfo       closeModal={()=>setChangeInfoModal(false)}     />}
            { profPicModal        && <ChangeProfilePic     closeModal={()=>setProfPicModal(false)}        /> }
            { changePasswordModal && <ChangePassword       closeModal={()=>setChangePasswordModal(false)} /> }
            { deleteConfirmModal  && <DeleteAccountConfirm closeModal={()=>setDeleteConfirmModal(false)} />}
        </div>
    )
}

export default SettingsPage