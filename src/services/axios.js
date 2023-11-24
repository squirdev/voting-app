import axios from "axios";
import { api } from "./api";

// axios.defaults.baseURL = "https://skupstina.azurewebsites.net/";
axios.defaults.baseURL = "http://localhost:5005/";


const signInUser = params => {
    return api.post("/api/login/", params);
}

// const signInUser = async (props) => {
//     try {
//         var result = await axios.post("/api/login/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }
const getAgenda = params => {
    return api.get("/api/get_agenda/", params);
}
const getUser = params => {
    return api.post("/api/users/", params);
}
const handleVote = params => {
    return api.post("/api/vote/", params);
}
const getVote = params => {
    return api.get("/api/get_vote/", params);
}
const startVote = params => {
    return api.post("/api/start_vote/", params);
}
const createUser = params => {
    return api.post("/api/create_user/", params);
}

const updateUser = params => {
    return api.post("/api/update_user/", params);
}

const deleteUser = params => {
    return api.post("/api/delete_user/", params);
}

const createAgenda = async (props) => {
    try {
        var result = await axios.post("/api/create_agenda/", props, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const updateAgenda = async (props) => {
    try {
        var result = await axios.post("/api/update_agenda/", props, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const closeVote = params => {
    return api.post("/api/close_vote/", params);
}



const deleteAgenda = params => {
    return api.post("/api/delete_agenda/", params);
}
const resetVote = params => {
    return api.post("/api/reset_vote/", params);
}

const getAllUser = params => {
    return api.get("/api/get_all_user/", params);
}


const getUserById = params => {
    return api.post("/api/users_city/", params);
}

const uploadFile = async (props) => {
    try {
        var result = await axios.post("/api/upload/", props, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const createSession = params => {
    return api.post("/api/create_session/", params);
}

const updateSession = params => {
    return api.post("/api/update_session/", params);
}

const deleteSession = params => {
    return api.post("/api/delete_session/", params);
}

const getSession = params => {
    return api.post("/api/get_session/", params);
}




export {
    closeVote, createAgenda, createSession, createUser, deleteAgenda, deleteSession, deleteUser, getAgenda, getAllUser, getSession, getUser, getUserById, getVote, handleVote, resetVote, signInUser, startVote, updateAgenda, updateSession, updateUser, uploadFile
};


// const getAgenda = async (props) => {
//     try {
//         var result = await axios.get("/api/get_agenda/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const getUser = async (props) => {
//     try {
//         var result = await axios.post("/api/users/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const handleVote = async (props) => {
//     try {
//         var result = await axios.post("/api/vote/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const getVote = async (props) => {
//     try {
//         var result = await axios.get("/api/get_vote/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }


// const startVote = async (props) => {
//     try {
//         var result = await axios.post("/api/start_vote/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }


// const closeVote = async (props) => {
//     try {
//         var result = await axios.post("/api/close_vote/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const createUser = async (props) => {
//     try {
//         var result = await axios.post("/api/create_user/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const updateUser = async (props) => {
//     try {
//         var result = await axios.post("/api/update_user/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const deleteUser = async (props) => {
//     try {
//         var result = await axios.post("/api/delete_user/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const deleteAgenda = async (props) => {
//     try {
//         var result = await axios.post("/api/delete_agenda/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const resetVote = async (props) => {
//     try {
//         var result = await axios.post("/api/reset_vote/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const getAllUser = async (props) => {
//     try {
//         var result = await axios.get("/api/get_all_user/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

// const getUserById = async (props) => {
//     try {
//         var result = await axios.post("/api/users_city/", props, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         return result.data;
//     } catch (error) {
//         return error.response
//     }
// }

