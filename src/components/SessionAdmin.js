import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getSession } from "../services/axios";
import AddSession from "./AddSession";
import EditSession from "./EditSession";

export default function SessionAdmin(props) {
    const TABLE_HEAD = ["Name", "Date", "Edit Session"];

    const [tableData, setTableData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)


    const [addSessionOpen, setAddSessionOpen] = useState(false);
    const [editSessionOpen, setEditSessionOpen] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [editSessionData, setEditSessionData] = useState({})
    const [selectedFile, setSelectedFile] = useState();


    useEffect(() => {
        const getSessionList = async () => {
            let res = await getSession();
            console.log("🚀 ~ file: SessionAdmin.js:45 ~ getSessionList ~ res:", res)
            setTableData(res.data.data);
        }
        getSessionList()
    }, [addSessionOpen, editSessionOpen])


    return (
        <div className="p-[20px]">
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Session list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Manage information about all Sessions
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            {/* <Button variant="outlined" size="sm">
                                view all
                            </Button> */}
                            <Button className="flex items-center gap-3" size="sm" onClick={() => setAddSessionOpen(true)}>
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add session
                            </Button>
                        </div>
                    </div>
                    {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div> */}
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.filter((item, index) => {
                                return currentIndex * 5 <= index && index < currentIndex * 5 + 5
                            }).map(
                                ({ name, date, _id }, index) => {
                                    const isLast = index === tableData.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">

                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {date}
                                                    </Typography>
                                                </div>
                                            </td>



                                            <td className={classes}>
                                                <Tooltip content="Edit User">
                                                    <IconButton variant="text" onClick={() => {
                                                        setEditSessionData({
                                                            id: _id,
                                                            name: name,

                                                        })
                                                        setEditSessionOpen(true)
                                                    }}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                            {/* <td className={classes}>
                                                <Tooltip content="Edit User">
                                                    <form className="flex flex-row justify-between p-[5px]" onSubmit={handleUpload}>
                                                        <input
                                                            onChange={handleFileChange}
                                                            // class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                                            type="file"
                                                        />

                                                        <Button onClick={(e) => handleUpload(e, _id)}>Upload</Button>
                                                    </form>
                                                </Tooltip>
                                            </td> */}
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentIndex + 1} of {Math.floor(tableData.length / 5 + 1)}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" onClick={() => {
                            if (currentIndex >= 1)
                                setCurrentIndex(currentIndex - 1)
                        }
                        }>
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm" onClick={() => {
                            if (currentIndex < tableData.length / 5 - 1)
                                setCurrentIndex(currentIndex + 1)
                        }}>
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <AddSession open={addSessionOpen} handleClose={() => setAddSessionOpen(false)} />
            <EditSession open={editSessionOpen} handleClose={() => setEditSessionOpen(false)} editSessionData={editSessionData} />
        </div >
    )
}