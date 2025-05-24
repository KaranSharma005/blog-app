const REACT_APP_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const makeRequest = async (endpoint, options) => {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : null;
    const headers = options.headers || {'Content-Type' : 'application/json'};

    const config = {method, headers,credentials: 'include'};
    if(body) config.body = body;

    try{
        const response = await fetch(`${REACT_APP_BACKEND_URL}${endpoint}`,config);
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.msg || data.message || "Something went wrong");
        }
        console.log(data);

        return data;
        
    }
    catch(err){
        throw err;
    }
}

export default makeRequest;