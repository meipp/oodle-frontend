const getEndpoint = () => {
    const endpoint =  import.meta.env.VITE_API_ENDPOINT 
    if(!endpoint) throw new Error("VITE_API_ENDPOINT is not set")
    return endpoint
}

export const ENDPOINT_URL = getEndpoint()
