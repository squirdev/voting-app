import {
    Button, Dialog,
    DialogBody,
    DialogFooter,
    IconButton, Input
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteSession, updateSession } from '../services/axios';

export default function EditSession(props) {

    const { open, handleOpen, handleClose, editSessionData } = props

    const [sessionName, setSessionName] = useState("");
    const [warningMsg, setWarningMsg] = useState();
    const [selectedFile, setSelectedFile] = useState();

    const onUpdateUser = async () => {

        if (sessionName == "") {
            setWarningMsg("Please input session name field!")
            return;
        }
        const data = {
            sessionName: sessionName,
            id: editSessionData.id
        }
        let res = await updateSession(data);
        if (res.data.success)
            toast.success("Successfully updated!")
        handleClose()
    }

    const onDeleteUser = async () => {
        let res = await deleteSession({ id: editSessionData.id });
        if (res.success)
            toast.success("Successfully removed!")
        console.log("🚀 ~ file: EditUser.js:46 ~ onDeleteUser ~ res:", res)
        handleClose()
    }

    useEffect(() => {
        setSessionName(editSessionData.name)
    }, [])

    return (
        <div>
            <Dialog open={open} handler={handleOpen} dismiss={false} >
                <DialogBody className='flex flex-row justify-between'>
                    Edit Session
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
                    <Input label="Session Name" defaultValue={editSessionData.name} onChange={(e) => {
                        setSessionName(e.target.value);
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