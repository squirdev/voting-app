import axios from "axios";

// axios.defaults.baseURL = "https://skupstina.azurewebsites.net/";
axios.defaults.baseURL = "http://localhost:5005/";

const signInUser = async (props) => {
    try {
        var result = await axios.post("/api/login/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const getAgenda = async (props) => {
    try {
        var result = await axios.get("/api/get_agenda/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const getUser = async (props) => {
    try {
        var result = await axios.post("/api/users/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const handleVote = async (props) => {
    try {
        var result = await axios.post("/api/vote/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const getVote = async (props) => {
    try {
        var result = await axios.get("/api/get_vote/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}


const startVote = async (props) => {
    try {
        var result = await axios.post("/api/start_vote/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}


const closeVote = async (props) => {
    try {
        var result = await axios.post("/api/close_vote/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const createUser = async (props) => {
    try {
        var result = await axios.post("/api/create_user/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const updateUser = async (props) => {
    try {
        var result = await axios.post("/api/update_user/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const deleteUser = async (props) => {
    try {
        var result = await axios.post("/api/delete_user/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}
const createAgenda = async (props) => {
    try {
        var result = await axios.post("/api/create_agenda/", props, {
            headers: {
                "Content-Type": "application/json",
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
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}
const deleteAgenda = async (props) => {
    try {
        var result = await axios.post("/api/delete_agenda/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const resetVote = async (props) => {
    try {
        var result = await axios.post("/api/reset_vote/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const getAllUser = async (props) => {
    try {
        var result = await axios.get("/api/get_all_user/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

const getUserById = async (props) => {
    try {
        var result = await axios.post("/api/users_city/", props, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return result.data;
    } catch (error) {
        return error.response
    }
}

export { signInUser, getAgenda, getUser, getUserById, handleVote, getVote, startVote, closeVote, resetVote, createAgenda, updateAgenda, deleteAgenda, createUser, updateUser, deleteUser, getAllUser };
