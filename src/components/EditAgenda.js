import {
    Button, Dialog,
    DialogBody,
    DialogFooter,
    IconButton, Input, Option, Select
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteAgenda, updateAgenda } from '../services/axios';

export default function EditAgenda(props) {

    const { open, handleOpen, handleClose, editAgendaData, session } = props

    const [agendaName, setAgendaName] = useState("");
    const [agendaPdf, setAgendaPdf] = useState("");
    const [selectedSession, setSelectedSession] = useState();
    const [warningMsg, setWarningMsg] = useState();
    const [selectedFile, setSelectedFile] = useState();

    const onUpdateUser = async () => {

        if (agendaName == "") {
            setWarningMsg("Please input agenda name field!")
            return;
        }

        const data = new FormData();
        data.append('file', selectedFile);
        data.append("agendaName", agendaName)
        data.append("id", editAgendaData.id)
        data.append("sessionId", selectedSession)
        let res = await updateAgenda(data);
        if (res.success)
            toast.success("Successfully updated!")
        handleClose()
    }

    const onDeleteUser = async () => {
        let res = await deleteAgenda({ id: editAgendaData.id });
        if (res.success)
            toast.success("Successfully removed!")
        console.log("🚀 ~ file: EditUser.js:46 ~ onDeleteUser ~ res:", res)
        handleClose()
    }

    useEffect(() => {
        setAgendaName(editAgendaData.name)
    }, [])

    const handleFileChange = (e) => {
        // define file change
        setSelectedFile(e.target.files[0])
        console.log("🚀 ~ file: AgendaAdmin.js:52 ~ handleFileChange ~ e.target:", e.target.files[0])
    };

    return (
        <div>
            <Dialog open={open} handler={handleOpen} dismiss={false} >
                <DialogBody className='flex flex-row justify-between'>
                    Edit Agenda
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
                    <Input label="Agenda Name" defaultValue={editAgendaData.name} onChange={(e) => {
                        setAgendaName(e.target.value);
                        setWarningMsg("")
                    }} />
                    <Select label="Session"
                        value={selectedSession}
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