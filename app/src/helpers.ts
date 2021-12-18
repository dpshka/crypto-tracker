function getHeaders(token: string) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

export { getHeaders };
