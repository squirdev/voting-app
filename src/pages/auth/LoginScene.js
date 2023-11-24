import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../services/axios";

export default function LoginScene() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const toMainScene = async () => {
        const signInData = {
            email: email,
            password: password
        }
        const res = await signInUser(signInData)
        console.log("🚀 ~ file: LoginScene.js:18 ~ toMainScene ~ res:", res)
        if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("userName", res.data.name);
            navigate("/main", {
                state: { role: res.data.role, userId: res.data.id, userName: res.data.name, token: res.data.token }
            })
        }
    }

    return (
        <div>
            <div className="w-full h-screen flex justify-center bg-[#FFF]">
                <div className="flex flex-col ">
                    <div className="text-[40px] text-[#00f] text-[700] mt-[80px] text-center">
                        Prijava
                    </div>

                    <div className="w-72 mt-[20px]">
                        <Input color="blue" label="Email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>

                    <div className="w-72 mt-[20px]">
                        <Input color="blue" type="password" label="Password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>

                    <div className="w-72 mt-[40px]">
                        <Button className="w-full bg-[blue]" onClick={toMainScene}>
                            Prijava
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}