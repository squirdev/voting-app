import { Button, Input, Typography } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogBody,
    DialogFooter,
    IconButton
} from "@material-tailwind/react";
import { deleteAgenda, deleteUser, updateAgenda, updateUser } from '../services/axios';
import { toast } from 'react-toastify';

export default function EditAgenda(props) {

    const { open, handleOpen, handleClose, editAgendaData } = props

    const [agendaName, setAgendaName] = useState("");
    const [agendaPdf, setAgendaPdf] = useState("");
    const [warningMsg, setWarningMsg] = useState();

    const onUpdateUser = async () => {

        if (agendaName == "" || agendaPdf == "") {
            setWarningMsg("Please input all field!")
            return;
        }
        const updateAgendaData = {
            id: editAgendaData.id,
            name: agendaName,
            pdf_path: agendaPdf

        }
        let res = await updateAgenda(updateAgendaData);
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
                    <Input label="Agenda Pdf" defaultValue={editAgendaData.pdf} onChange={(e) => {
                        setAgendaPdf(e.target.value);
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