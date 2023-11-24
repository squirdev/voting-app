import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TVCustomButton from "../../components/TVCustomButton";
import { getAgenda, getUserById } from "../../services/axios";
import { socket } from '../../utils/socket';

export default function TVScene(props) {

    let param = useParams()
    console.log("🚀 ~ file: TVScene.js:10 ~ TVScene ~ param:", param)
    const [userList, setUserList] = useState()
    const [party, setParty] = useState([]);
    const [users, setUsers] = useState([]);
    const [emitAgendaIndex, setEmitAgendaIndex] = useState(0);
    const [abstrainedNum, setAbstrainedNum] = useState(0);
    const [yesNum, setYesNum] = useState(0);
    const [noNum, setNoNum] = useState(0);
    const [notVotedNum, setNotVotedNum] = useState(0);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [selectedAgenda, setSelectedAgenda] = useState([]);

    useEffect(() => {
        const getUserListByCity = async () => {
            const cityData = {
                city: param.handle
            }
            let res = await getUserById(cityData);
            setUserList(res.data.data)
            const partyGroup = Object.groupBy(res.data.data, ({ party }) => party);
            Object.values(partyGroup)
            setParty(Object.keys(partyGroup))
            setUsers(Object.values(partyGroup))
        }
        getUserListByCity()
    }, []);

    socket.on("message", function (data) {
        setEmitAgendaIndex(data)
    })
    socket.on("vote_update", function (data) {
        setUpdateFlag(!updateFlag)
    })
    useEffect(() => {
        const getAgendasAndUsers = async () => {
            const res = await getAgenda();
            let tmp
            if (res.data.data[emitAgendaIndex]?.vote_info && res.data.data[emitAgendaIndex]?.vote_info !== 'undefined') {
                tmp = JSON.parse(res.data.data[emitAgendaIndex]?.vote_info)
            }
            setSelectedAgenda(tmp)
            if (tmp == null) {
                setYesNum(0)
                setNoNum(0)
                setAbstrainedNum(0)
                setNotVotedNum(0)
                return;
            }
            const result = Object.groupBy(tmp, ({ decision }) => decision);
            let yes = result["1"]?.length === undefined ? 0 : result["1"]?.length;
            let no = result["0"]?.length === undefined ? 0 : result["0"]?.length;
            let ab = result["2"]?.length === undefined ? 0 : result["2"]?.length;
            setYesNum(yes)
            setNoNum(no)
            setAbstrainedNum(ab)
            setNotVotedNum((yes + no + ab))
        }
        getAgendasAndUsers();
    }, [emitAgendaIndex, updateFlag])

    const getDecisionFromAgenda = (userId, voteInfo) => {
        if (voteInfo == null)
            return 3
        else {
            for (var i = 0; i < voteInfo.length; i++) {
                if (voteInfo[i].user_id == userId) {
                    return voteInfo[i].decision
                }
            }
            return 3;
        }
    }


    return (
        <div className="flex flex-col justify-between w-full h-screen   bg-[#fff]">

            <div className="grid grid-cols-2 overflow-y-auto p-[20px]">
                {
                    party?.map((item, index) => {
                        return (
                            <div className="w-full px-[20px]">
                                <div className="text-[20px] text-[700] text-[#2E2E2E] text-center mt-[20px]">
                                    {item}
                                </div>
                                <div className="w-full h-[2px] bg-[#D9D9D9] mt-[10px] ">
                                </div>
                                <div className="">
                                    {
                                        users[index].map((userItem) => {
                                            return (
                                                <TVCustomButton name={userItem.name} decision={getDecisionFromAgenda(userItem._id, selectedAgenda)} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })

                }

            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto ">
                {
                    userList?.map((item, index) => {
                        return (
                            <div className="flex w-full ">
                                <TVCustomButton name={item.name} />
                            </div>)
                    })
                }
            </div > */}
            <div className="relative flex flex-col items-center h-[150px]">
                <div className="absolute bottom-0 flex flex-wrap justify-between gap-4 p-5 ">
                    <div className="flex flex-col w-[200px] rounded-md h-[100px] bg-[#f5f5f5] justify-center items-center">
                        <p className="text-[20px] text-[#111] text-center">
                            Ukupno
                        </p>
                        <p className="text-[40px] text-[#111] text-center">
                            {notVotedNum}
                        </p>
                    </div>
                    <div className="flex flex-col w-[200px] rounded-md h-[100px] bg-[#4AD527] justify-center items-center ">
                        <p className="text-[20px] text-[#111] text-center">
                            Za
                        </p>
                        <p className="text-[40px] text-[#111] text-center">
                            {yesNum}
                        </p>
                    </div>
                    <div className="flex flex-col w-[200px] rounded-md h-[100px] bg-[#377AFC] justify-center items-center ">
                        <p className="text-[20px] text-[#111] text-center">
                            Suzdržano
                        </p>
                        <p className="text-[40px] text-[#111] text-center">
                            {abstrainedNum}
                        </p>
                    </div>
                    <div className="flex flex-col w-[200px] rounded-md h-[100px] bg-[#EF4343] justify-center items-center ">
                        <p className="text-[20px] text-[#111] text-center">
                            Protiv
                        </p>
                        <p className="text-[40px] text-[#111] text-center">
                            {noNum}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}