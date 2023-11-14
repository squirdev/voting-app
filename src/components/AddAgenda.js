import { Button, Input, Typography } from '@material-tailwind/react';
import {
    Dialog,
    DialogBody,
    DialogFooter,
    IconButton,
} from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import { createAgenda } from '../services/axios';
import { toast } from "react-toastify";

export default function AddAgenda(props) {

    const { open, handleOpen, handleClose, update } = props

    const [agendaName, setAgendaName] = useState("");
    const [agendaPdf, setAgendaPdf] = useState("");
    const [warningMsg, setWarningMsg] = useState();

    const onAddUser = async () => {

        if (agendaName == "" || agendaPdf == "") {
            setWarningMsg("Please input all field!")
            return;
        }
        const addAgendaData = {
            name: agendaName,
            pdf: agendaPdf
        }
        let res = await createAgenda(addAgendaData);
        if (res.status) {
            // update()
        }
        handleClose()
    }
    useEffect(() => {
        if (open) {
            setAgendaName('');
            // ... reset other state variables
        }
    }, [open]);

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

                    <Input label="Pdf" onChange={(e) => {
                        setAgendaPdf(e.target.value);
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