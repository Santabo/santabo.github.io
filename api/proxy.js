const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { apiUrl } = req.query;

    if (!apiUrl) {
        res.status(400).send('Missing apiUrl query parameter');
        return;
    }

    try {
        const response = await fetch(apiUrl, { timeout: 8000 }); // Set a timeout for fetch
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data', details: error.message });
    }
};
