import {
    Button, Dialog,
    DialogBody,
    DialogFooter,
    IconButton, Input
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { createSession } from '../services/axios';

export default function AddSession(props) {

    const { open, handleOpen, handleClose, update } = props

    const [sessionName, setSessionName] = useState("");
    const [agendaPdf, setAgendaPdf] = useState("");
    const [warningMsg, setWarningMsg] = useState();
    const [selectedFile, setSelectedFile] = useState();

    const onAddUser = async () => {

        if (sessionName == "") {
            setWarningMsg("Please input session name field!")
            return;
        }

        const addSessionData = {
            sessionName: sessionName
        }
        // Display the key/value pairs
        await createSession(addSessionData)

        // let res = await createAgenda(addAgendaData);
        // if (res.status) {
        //     // update()
        // }
        handleClose()
    }
    useEffect(() => {
        if (open) {
            setSessionName('');
            // ... reset other state variables
        }
    }, [open]);


    return (
        <div>
            <Dialog open={open} handler={handleOpen} dismiss={false} >
                <DialogBody className='flex flex-row justify-between'>
                    <p className='text-[24px] text-[#000]'>
                        Add Session
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
                    <Input label="Session Name" onChange={(e) => {
                        setSessionName(e.target.value);
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