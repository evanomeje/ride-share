const baseUrl = (
    process.env.REACT_APP_ENV === 'dev'
    ? 'http://localhost:8080'
    : 'https://app.evanomeje.xyz'
  );
  export const api = {};
  api.get = async endpoint => {
    const res = await fetch(`${baseUrl}${endpoint}`);
    if (res.json) return await res.json() || [];
    return res;
  };