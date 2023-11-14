import { useEffect, useState } from "react";
import UserAdmin from "../../components/UserAdmin";
import AgendaAdmin from "../../components/AgendaAdmin";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";


export default function AdminScene(props) {
    const data = [
        {
            label: "User",
            value: "user",
        },
        {
            label: "Agenda",
            value: "agenda",
        }
    ];
    return (
        <div className="">
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
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>

        </div >
    )
}