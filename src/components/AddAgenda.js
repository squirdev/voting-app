import {
    Button, Dialog,
    DialogBody,
    DialogFooter,
    IconButton, Input, Option, Select
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { createAgenda, uploadFile } from '../services/axios';

export default function AddAgenda(props) {

    const { open, handleOpen, handleClose, session } = props

    const [agendaName, setAgendaName] = useState("");
    const [selectedSession, setSelectedSession] = useState();
    const [warningMsg, setWarningMsg] = useState();
    const [selectedFile, setSelectedFile] = useState();

    const onAddUser = async () => {

        if (agendaName == "") {
            setWarningMsg("Please input agenda name field!")
            return;
        }

        const data = new FormData();
        data.append('file', selectedFile);
        data.append("agendaName", agendaName)
        data.append("sessionId", selectedSession)
        // Display the key/value pairs
        await createAgenda(data)

        // let res = await createAgenda(addAgendaData);
        // if (res.status) {
        //     // update()
        // }
        handleClose()
    }
    useEffect(() => {
        if (open) {
            setAgendaName('');
            // ... reset other state variables
        }
    }, [open]);


    const handleFileChange = (e) => {
        // define file change
        setSelectedFile(e.target.files[0])
        console.log("🚀 ~ file: AgendaAdmin.js:52 ~ handleFileChange ~ e.target:", e.target.files[0])
    };
    const handleUpload = async (event, _id) => {
        console.log("🚀 ~ file: AgendaAdmin.js:55 ~ handleUpload ~ index:", _id)
        event.preventDefault();
        const data = new FormData();
        data.append('file', selectedFile);
        console.log("🚀 ~ file: AgendaAdmin.js:59 ~ handleUpload ~ selectedFile:", selectedFile)
        data.append("id", _id)
        // Display the key/value pairs
        await uploadFile(data)

    };


    return (
        <div>
            <Dialog open={open} handler={handleOpen} dismiss={false} >
                <DialogBody className='flex flex-row justify-between'>
                    <p className='text-[24px] text-[#000]'>
                        Add Agenda
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
                    <Input label="Agenda Name" onChange={(e) => {
                        setAgendaName(e.target.value);
                        setWarningMsg("")
                    }} />

                    <Select label="Session"
                        // value={selectedSession}
                        onChange={(e) => {
                            setSelectedSession(e)
                        }}>
                        {
                            session?.map((item) => {
                                return <Option key={item._id} value={item._id}>{item.name}</Option>
                            })
                        }
                    </Select>
                    <input label="Pdf"
                        type="file"
                        className='w-full'

                        onChange={handleFileChange} />
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