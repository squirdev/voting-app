import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { getAllUser } from "../services/axios";

export default function UserAdmin(props) {


    const TABLE_HEAD = ["User", "Email", "Password", "City", "Party", "Role", "Edit User"];

    const [tableData, setTableData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)


    const [addUserOpen, setAddUserOpen] = useState(false);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [editUserData, setEditUserData] = useState({})


    useEffect(() => {
        const getAllUserList = async () => {
            let res = await getAllUser();
            setTableData(res.data);
            console.log("🚀 ~ file: AdminScene.js:92 ~ getAllUserList ~ res:", res)
        }
        getAllUserList()
    }, [addUserOpen, editUserOpen])

    return (
        <div className="p-[20px]">
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                User list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Manage information about all users
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            {/* <Button variant="outlined" size="sm">
                                view all
                            </Button> */}
                            <Button className="flex items-center gap-3" size="sm" onClick={() => setAddUserOpen(true)}>
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
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
                                ({ name, email, role, password, party, city, _id }, index) => {
                                    const isLast = index === tableData.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={_id}>
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
                                                        {email}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">

                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {password}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {city}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {party}
                                                </Typography>
                                            </td> <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {role}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit User">
                                                    <IconButton variant="text" onClick={() => {
                                                        setEditUserData({
                                                            id: _id,
                                                            name: name,
                                                            email: email,
                                                            password: password,
                                                            role: role,
                                                            city: city,
                                                            party: party
                                                        })
                                                        setEditUserOpen(true)
                                                    }}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
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
            <AddUser open={addUserOpen} handleClose={() => setAddUserOpen(false)} />
            <EditUser open={editUserOpen} handleClose={() => setEditUserOpen(false)} editUserData={editUserData} />
        </div >
    )
}