import {
    Button, Dialog,
    DialogBody,
    DialogFooter,
    IconButton, Input, Option, Select
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { createUser } from '../services/axios';

export default function AddUser(props) {

    const { open, handleOpen, handleClose, update } = props

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userParty, setUserParty] = useState("");
    const [warningMsg, setWarningMsg] = useState();

    const onAddUser = async () => {

        if (userName == "" || userEmail == "" || userPassword == "" || userRole == "" || userCity == "" || userParty == "") {
            setWarningMsg("Please input all field!")
            return;
        }
        const addUserData = {
            name: userName,
            email: userEmail,
            password: userPassword,
            role: userRole,
            city: userCity,
            party: userParty
        }
        let res = await createUser(addUserData);
        console.log("🚀 ~ file: AddUser.js:31 ~ onAddUser ~ res:", res)
        if (res.status) {
            // update()
        }
        handleClose()
    }
    useEffect(() => {
        if (open) {
            setUserName('');
            setUserEmail('');
            setUserCity('');
            setUserParty('');
            setUserPassword('');
            setUserRole('');
            // ... reset other state variables
        }
    }, [open]);

    return (
        <div>
            <Dialog open={open} handler={handleOpen} dismiss={false} >
                <DialogBody className='flex flex-row justify-between'>
                    <p className='text-[24px] text-[#000]'>
                        Add User
                    </p>
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
                    <Input label="Username" onChange={(e) => {
                        setUserName(e.target.value);
                        setWarningMsg("")
                    }} />
                    <Input label="Email" onChange={(e) => {
                        setUserEmail(e.target.value);
                        setWarningMsg("")
                    }} />
                    <Input label="Password" onChange={(e) => {
                        setUserPassword(e.target.value);
                        setWarningMsg("")
                    }} />
                    <Input label="City" onChange={(e) => {
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
                    <Input label="Party" onChange={(e) => {
                        setUserParty(e.target.value);
                        setWarningMsg("")
                    }} />
                    <div className='flex flex-col gap-5'>
                        <p className='text-[#F00]'>
                            {warningMsg}
                        </p>
                        <Button variant="gradient" color="red" onClick={() => onAddUser()}>
                            <span>Add</span>
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog>

        </div>
    )
}