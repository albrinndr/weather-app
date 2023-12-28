import Api from "./axios";

export const signUp = async (data) => {
    const response = await Api.post('/signup', data);
    return response.data;
};

export const login = async (data) => {
    const response = await Api.post('/login', data);
    return response.data;
};

export const addLocation = async (location) => {
    const response = await Api.post(`/addLocation?location=${location}`);
    return response.data;
};

export const removeLocation = async (location) => {
    const response = await Api.post(`/removeLocation?location=${location}`);
    return response.data;
};

export const logout = async () => {
    const response = await Api.post('/logout');
    return response.data;
};

export const getUserLocations = async () => {
    const response = await Api.get('/locations');
    return response.data;
};
