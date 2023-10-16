export default async function fetchData(url, method, token) {
    const resposne = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await resposne.json();
    return data;
}
