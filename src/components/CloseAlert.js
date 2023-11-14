import { Button } from '@material-tailwind/react';
import {
    Dialog,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export default function CloseAlert(props) {

    const { open, handleOpen, handleClose } = props

    return (
        <div>
            {
                open &&

                <div open={open} handler={handleOpen} dismiss={true} className='absolute w-screen h-screen flex justify-center items-center top-0' >
                    <div className='flex flex-col justify-between p-[20px] w-[500px] h-[150px] bg-[#ddd] rounded-md'>
                        <div className='text-center'>
                            glasanje
                        </div>
                        <div className='flex flex-row items-center justify-center gap-3'>
                            <Button variant="gradient" color="yellow" onClick={() => handleClose(false)}>
                                <span>zatvori</span>
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}