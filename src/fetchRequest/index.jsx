const REACT_APP_BACKEND_URL = process.env.BACKEND_URL;
const makeRequest = async (endpoint, options) => {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : null;
    const headers = options.headers || {'Content-Type' : 'application/json'};

    const config = {method, headers};
    if(body) config.body = {body};

    try{
        const response = await fetch(`${REACT_APP_BACKEND_URL}${endpoint}`,config);
        if(!response.ok){
            throw new Error("Error in making request to server");
        }

        return await response.json();
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

export default makeRequest;