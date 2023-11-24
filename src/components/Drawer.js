import {
    Drawer,
    IconButton,
    Typography
} from "@material-tailwind/react";

export default function CustomDrawer({ open, handleClose, userName, data, selectSession }) {
    console.log("🚀 ~ file: Drawer.js:10 ~ CustomDrawer ~ data:", data)
    const convertTime = (param) => {
        const event = new Date(param);
        return event.toLocaleString();
    }

    const handleSession = (sessionId) => {
        selectSession(sessionId)
    }

    return (
        <Drawer open={open} onClose={handleClose} className="p-4 ">
            <div className="mb-6 flex items-end justify-end">
                <IconButton variant="text" color="blue-gray" onClick={handleClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </div>
            <Typography variant="h4" color="blue-gray" className="text-center">
                {userName}
            </Typography>
            {
                data?.map((item, index) => {
                    return <button className="flex flex-row justify-between items-center w-full p-[5px] mt-[10px]" variant="text" onClick={() => handleSession(item._id)}>
                        <div className="flex items-center justify-center min-w-[40px] min-h-[40px] rounded-full bg-[#ddd] border-[1px] border-[#000]">
                            <Typography variant="text" color="black" className=" w-full  text-[20px] font-[400]" >
                                {index}
                            </Typography>
                        </div>
                        <div className="flex flex-col w-full">
                            <Typography variant="text" color="black" className=" w-full text-center text-[26px] font-[600]" >
                                {item.name}
                            </Typography>
                            <Typography variant="text" color="black" className=" w-full text-center text-[16px] font-[400] ">
                                {convertTime(item.date)}
                            </Typography>
                        </div>
                    </button>
                })
            }

        </Drawer>
    )
}