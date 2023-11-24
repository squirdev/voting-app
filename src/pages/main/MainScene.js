import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminIcon from "../../assets/Admin.svg";
import ArrowIcon from "../../assets/Arrow_Right.svg";
import ZoomSvg from '../../assets/Zoom.svg';
import MenuIcon from "../../assets/menu.svg";
import CloseAlert from "../../components/CloseAlert";
import CustomButton from "../../components/CustomButton";
import PdfViewer from "../../components/CustomPdfViewer";
import CustomDrawer from "../../components/Drawer";
import UserComponent from "../../components/UserComponent";
import VoteAlert from "../../components/VoteAlert";
import { setAuthorization } from "../../services/api";
import { closeVote, getAgenda, getSession, getUser, handleVote, resetVote, startVote } from "../../services/axios";
import { socket } from '../../utils/socket';

export default function MainScene(props) {
    // const { navigation } = props;
    const { state } = useLocation();
    const navigate = useNavigate();
    const [agendas, setAgendas] = useState([]);
    const [party, setParty] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emitAgendaIndex, setEmitAgendaIndex] = useState(0);
    const [open, setOpen] = useState(false)
    const [adminOpen, setAdminOpen] = useState(false);
    const [abstrainedNum, setAbstrainedNum] = useState(0);
    const [yesNum, setYesNum] = useState(0);
    const [noNum, setNoNum] = useState(0);
    const [notVotedNum, setNotVotedNum] = useState(0);
    const [selectedAgenda, setSelectedAgenda] = useState([]);
    const [startedVote, setStartedVote] = useState();
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [resultOpen, setResultOpen] = useState(false);
    const [drawerShow, setDrawerShow] = useState(false);
    const [userName, setUserName] = useState("");
    const [sessionData, setSessionData] = useState();
    const [selectedSessionId, setSelectedSessionId] = useState();

    // useEffect(() => {
    //     setInterval(function greet() {
    //         socket.emit("vote_update", "message")
    //     }, 2000)
    // }, [])

    socket.on("message", function (data) {
        setEmitAgendaIndex(data)
        setOpen(!open)
    })

    socket.on("vote_update", function (data) {
        setUpdateFlag(!updateFlag)
    })

    socket.on("vote_close", function (data) {
        // setResultData(data)
        // setResultOpen(true);
        setOpen(false);
    })

    const changeVoteView = async (param) => {
        console.log("🚀 ~ file: MainScene.js:51 ~ changeVoteView ~ param:", param)
        if (state?.role == "admin") {
            setAdminOpen(!adminOpen)
        }
        setOpen(!open);
        const voteData = {
            user_id: state?.userId,
            agenda_id: agendas[emitAgendaIndex]._id,
            decision: param
        }
        console.log("🚀 ~ file: MainScene.js:61 ~ changeVoteView ~ voteData:", voteData)
        let res = await handleVote(voteData)
        socket.emit("vote_update", "message")
    }

    const sendVoteStart = async () => {
        // setAdminOpen(true);
        if (checkAgendaState() == 2) {
            toast("Voting already closed!")
            return
        }
        socket.emit("message", selectedIndex);
        const startVoteData = {
            agenda_item_id: agendas[selectedIndex]._id
        }
        setStartedVote(startVoteData);
        await startVote(startVoteData)
        socket.emit("vote_update", "message")
    }

    const sendVoteClose = async () => {
        socket.emit("vote_update", "message")
        socket.emit("vote_close", {
            yesNum: yesNum,
            noNum: noNum,
            abstrainedNum: abstrainedNum,
        })
        await closeVote(startedVote)
        setAdminOpen(false);
        // setTimeout(async () => {
        // }, 1000);
    }


    const sendVoteReset = async () => {
        const resetData = {
            agenda_id: agendas[selectedIndex]._id,
        }
        await resetVote(resetData);
        setIsReset(!isReset);
        socket.emit("vote_update", "message")
    }

    // 
    useEffect(() => {
        const getAgendasAndUsers = async () => {
            const userIdData = {
                id: localStorage.getItem("id")
            }
            setAuthorization(localStorage.getItem("token"))
            setUserName(localStorage.getItem("userName"))
            try {
                const resp = await getUser(userIdData);
                console.log("🚀 ~ file: MainScene.js:127 ~ getAgendasAndUsers ~ resp:", resp)
                const partyGroup = Object.groupBy(resp.data.data, ({ party }) => party);
                Object.values(partyGroup)
                setParty(Object.keys(partyGroup))
                setUsers(Object.values(partyGroup))


                let res_session = await getSession();
                console.log("🚀 ~ file: MainScene.js:164 ~ getAgendasAndUsers ~ res_session:", res_session)
                setSessionData(res_session.data.data)


                const res = await getAgenda();
                let session_agenda
                if (selectedSessionId) {
                    session_agenda = res.data.data?.filter((item) => {
                        return item.session_id == selectedSessionId
                    })
                }

                else {
                    session_agenda = res.data.data
                }

                console.log("🚀 ~ file: MainScene.js:148 ~ console.log ~ res.data.data:", res.data.data)
                setAgendas(session_agenda)
                let tmp
                if (res.data.data[selectedIndex]?.vote_info && res.data.data[selectedIndex]?.vote_info !== 'undefined') {
                    tmp = JSON.parse(res.data.data[selectedIndex]?.vote_info)
                }
                console.log("🚀 ~ file: MainScene.js:140 ~ getAgendasAndUsers ~ tmp:", tmp)
                setSelectedAgenda(tmp)
                if (tmp == null) {
                    setYesNum(0)
                    setNoNum(0)
                    setAbstrainedNum(0)
                    setNotVotedNum(0)
                    return;
                }
                const result = Object.groupBy(tmp, ({ decision }) => decision);
                console.log("🚀 ~ file: MainScene.js:150 ~ getAgendasAndUsers ~ result:", result)
                let yes = result["1"]?.length === undefined ? 0 : result["1"]?.length;
                let no = result["0"]?.length === undefined ? 0 : result["0"]?.length;
                let ab = result["2"]?.length === undefined ? 0 : result["2"]?.length;
                setYesNum(yes)
                setNoNum(no)
                setAbstrainedNum(ab)
                setNotVotedNum((yes + no + ab))
                /* get session part */


            } catch (error) {
                navigate("/")
            }
        }
        getAgendasAndUsers();
    }, [selectedIndex, isReset, open, adminOpen, updateFlag, selectedSessionId])




    const checkAgendaState = () => {
        return agendas[selectedIndex].vote_state
    }

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

    const onClickMenuItem = () => {
        setDrawerShow(true);
    }

    const onClickClose = async () => {
        setDrawerShow(false)
    }


    const navigateAdminPage = () => {
        navigate("/admin")
    }

    const logOut = () => {
        localStorage.setItem("token", "")
        navigate("/")
    }

    const selectSession = (param) => {
        setSelectedSessionId(param)
        onClickClose()
    }

    return (
        <div className="flex flex-col  h-screen">
            <div className={`${isFullScreen ? '' : ''} h-full  w-full bg-[#ddd]`} >
                <div className="h-[5%] w-full bg-[#ddd] flex items-center justify-between p-[0px]">
                    <Button className="flex items-center  h-full ml-[5px] " variant="text" onClick={onClickMenuItem}>
                        <img src={MenuIcon} />
                    </Button>
                    <div className="flex flex-row items-center">
                        <Button className="flex items-center h-full " variant="text" onClick={navigateAdminPage}>
                            <img src={AdminIcon} className="w-[30px] h-[30px]" />
                        </Button>
                        <Button className="flex items-center h-full " variant="text" onClick={logOut}>
                            <img src={ArrowIcon} />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-2 justify-between h-full md:h-[95%] ">
                    {
                        isFullScreen && <div className='flex flex-col basis-1/4 bg-[#FFF] border-[2px] border-[#ccc] rounded-[8px] px-[20px] pt-[40px] overflow-y-auto'>
                            {
                                agendas.map((item, index) => {
                                    console.log("🚀 ~ file: MainScene.js:247 ~ console.log ~ item._id:", item._id)
                                    return (
                                        <CustomButton selected={index == selectedIndex} index={index + 1} locked={agendas[index].vote_state == 2} name={item.name} onClick={() => { setSelectedIndex(index) }} >
                                        </CustomButton>)
                                })
                            }
                        </div>
                    }
                    <div className={`${isFullScreen ? 'md:basis-2/4' : 'basis-full'} relative w-full h-[500px] md:h-full  bg-[#FFF] border-[2px] border-[#ccc] rounded-[8px]`} >
                        <PdfViewer className="" url={"http://localhost:5005/api/pdf?agenda=" + agendas[selectedIndex]?._id} />
                        {/* <PdfViewer url={"http://45.84.0.116:5005/api/pdf?agenda=0"} /> */}
                        <div className="absolute bottom-5 right-10">
                            <button onClick={() => {
                                setIsFullScreen(!isFullScreen)
                            }}>
                                <img src={ZoomSvg} width={60} height={60} />
                            </button>
                        </div>
                    </div>
                    {
                        isFullScreen &&
                        <div className="relative flex flex-col items-center basis-1/4  border-[2px] border-[#ccc] rounded-[8px] bg-[#fff]  p-[20px]">
                            <div className="flex flex-row w-full justify-between bg-[#f5f5f5] rounded-[20px] p-[10px]">
                                <div className="flex flex-col items-center">
                                    <div className='flex items-center justify-center w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-[#D9D9D9] border-[2px] border-[#5B5B5B] text-[#5B5B5B]'>
                                        {notVotedNum}
                                    </div>
                                    <div className="w-[40px] md:w-[70px] text-[12px] text-center break-words">
                                        Ukupno
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className='flex items-center justify-center w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[white] rounded-full bg-[#4AD527] border-[#5B5B5B] '>
                                        {yesNum}
                                    </div>
                                    <div className="w-[40px] md:w-[70px] text-[12px] text-center break-words">
                                        Za
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className='flex items-center justify-center w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[white] rounded-full bg-[#377AFC] border-[#5B5B5B] '>
                                        {abstrainedNum}
                                    </div>
                                    <div className="w-[40px] md:w-[70px] text-[12px] text-center break-words">
                                        Suzdržano
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className='flex items-center justify-center w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[white] rounded-full bg-[#EF4343] border-[#5B5B5B] '>
                                        {noNum}
                                    </div>
                                    <div className="w-[40px] md:w-[70px] text-[12px] text-center break-words">
                                        Protiv
                                    </div>
                                </div>

                            </div>

                            <div className="w-full overflow-y-auto">
                                {
                                    party?.map((item, index) => {
                                        return (
                                            <div className="w-full">
                                                <div className="text-[20px] text-[700] text-[#2E2E2E] text-center mt-[20px]">
                                                    {item}
                                                </div>
                                                <div className="w-full h-[4px] bg-[#D9D9D9] mt-[10px]">
                                                </div>
                                                <div className="w-full h-full flex flex-col">
                                                    {
                                                        users[index].map((userItem) => {
                                                            return (
                                                                <UserComponent decision={getDecisionFromAgenda(userItem._id, selectedAgenda)} name={userItem.name} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })

                                }

                            </div>
                            {localStorage.getItem("role") == "admin" &&
                                <div className="w-full h-[120px]">

                                </div>
                            }
                            {
                                localStorage.getItem("role") == "admin" &&
                                <div className='absolute bottom-0 flex flex-row gap-10 p-[10px] justify-between '>
                                    <Button className=' w-[120px] bg-[green] text-[12px]' onClick={sendVoteStart}>
                                        Otvori glasanje
                                    </Button>
                                    <Button className=' w-[120px] bg-[#f00] text-[12px]' onClick={sendVoteReset}>
                                        Resetiraj glasanje
                                    </Button>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <CloseAlert open={adminOpen} handleOpen={sendVoteStart} handleClose={sendVoteClose} />
            <VoteAlert open={open} agenda={agendas?.at(emitAgendaIndex)} handleOpen={changeVoteView} />
            <CustomDrawer open={drawerShow} handleClose={onClickClose} userName={userName} data={sessionData} selectSession={selectSession} />
            {/* <ResultAlert open={resultOpen} resultData={resultData} handleClose={handleResultClose} /> */}
        </div >
    )
}