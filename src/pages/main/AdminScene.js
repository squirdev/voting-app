import {
    Button,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import LeftIcon from "../../assets/Arrow_Left.svg";
import AgendaAdmin from "../../components/AgendaAdmin";
import SessionAdmin from "../../components/SessionAdmin";
import UserAdmin from "../../components/UserAdmin";


export default function AdminScene(props) {
    const data = [
        {
            label: "User",
            value: "user",
        },
        {
            label: "Agenda",
            value: "agenda",
        },
        {
            label: "Session",
            value: "session",
        }
    ];
    const navigate = useNavigate();

    const onClickLeftItem = () => {
        navigate("/main")
    }

    return (
        <div className="">
            <div className="w-full h-[50px] bg-[#ddd]">
                <Button className="flex items-center  h-full ml-[5px] " variant="text" onClick={onClickLeftItem}>
                    <img src={LeftIcon} />
                </Button>
            </div>
            <Tabs value="user">
                <TabsHeader>
                    {data.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {
                                value == "user" &&
                                <UserAdmin />
                            }
                            {
                                value == "agenda" &&
                                <AgendaAdmin />
                            }
                            {
                                value == "session" &&
                                <SessionAdmin />
                            }

                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>

        </div >
    )
}