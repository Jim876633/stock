const token = "token=ccqpj62ad3ic1teksln0ccqpj62ad3ic1tekslng";

const fetchData = async (url, symbol = "") => {
    const res = await fetch(url + token);
    const data = await res.json();
    if (data.error) {
        throw new Error("You don't have access to this resource.");
    } else {
        return { symbol, data };
    }
};

export default fetchData;
