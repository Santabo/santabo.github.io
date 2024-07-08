export default async function handler(req, res) {
    const { apiUrl } = req.query;

    if (!apiUrl) {
        res.status(400).json({ error: 'API URL is required' });
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
