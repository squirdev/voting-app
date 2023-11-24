import {
    Button, Dialog,
    DialogBody,
    DialogFooter,
    IconButton, Input, Option, Select
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteUser, updateUser } from '../services/axios';

export default function EditUser(props) {

    const { open, handleOpen, handleClose, editUserData } = props

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userParty, setUserParty] = useState("");
    const [warningMsg, setWarningMsg] = useState();

    const onUpdateUser = async () => {

        if (userName == "" || userEmail == "" || userPassword == "" || userRole == "" || userCity == "" || userParty == "") {
            setWarningMsg("Please input all field!")
            return;
        }
        const updateUserData = {
            id: editUserData.id,
            name: userName,
            email: userEmail,
            password: userPassword,
            role: userRole,
            city: userCity,
            party: userParty
        }
        let res = await updateUser(updateUserData);
        if (res.success)
            toast.success("Successfully updated!")
        handleClose()
    }

    const onDeleteUser = async () => {
        let res = await deleteUser({ id: editUserData.id });
        if (res.success)
            toast.success("Successfully removed!")
        console.log("🚀 ~ file: EditUser.js:46 ~ onDeleteUser ~ res:", res)
        handleClose()
    }

    useEffect(() => {
        setUserName(editUserData.name)
        setUserEmail(editUserData.email)
        setUserCity(localStorage.getItem("city"))
        setUserParty(editUserData.party)
        setUserRole(editUserData.role)
        setUserPassword(editUserData.password)
    }, [])


    return (
        <div>
            <Dialog open={open} handler={handleOpen} dismiss={false} >
                <DialogBody className='flex flex-row justify-between'>
                    Edit User
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogBody>
                <DialogFooter className='flex flex-row items-center justify-center gap-3'>
                    <Input label="Username" defaultValue={editUserData.name} onChange={(e) => {
                        setUserName(e.target.value);
                        setWarningMsg("")
                    }} />
                    <Input label="Email" defaultValue={editUserData.email} onChange={(e) => {
                        setUserEmail(e.target.value);
                        setWarningMsg("")
                    }} />
                    <Input label="Password" defaultValue={editUserData.password} onChange={(e) => {
                        setUserPassword(e.target.value);
                        setWarningMsg("")
                    }} />
                    <Input label="City" disabled defaultValue={editUserData.city} onChange={(e) => {
                        setUserCity(e.target.value);
                        setWarningMsg("")
                    }} />
                    <Select label="Role"
                        value={userRole}
                        onChange={(e) => {
                            setUserRole(e)
                        }}>
                        <Option value="admin">Admin</Option>
                        <Option value="user" >User</Option>
                    </Select>
                    <Input label="Party" defaultValue={editUserData.party} onChange={(e) => {
                        setUserParty(e.target.value);
                        setWarningMsg("")
                    }} />
                    <div className='flex flex-col gap-5'>
                        <p className='text-[#F00]'>
                            {warningMsg}
                        </p>
                        <div className='flex flex-row gap-5'>
                            <Button variant="gradient" color="red" onClick={() => onDeleteUser(false)}>
                                <span>Delete</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={() => onUpdateUser()}>
                                <span>Update</span>
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </Dialog>

        </div>
    )
}