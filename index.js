import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/download', async (req, res) => {
    const { url } = req.query;

    try {
        const ytApiResponse = await fetch(`https://hiroshi-rest-api.replit.app/tools/yt?url=${url}`);
        const ytData = await ytApiResponse.json();

        if (ytApiResponse.ok) {
            res.json({
                mp4: ytData.mp4,
                info: ytData.info
            });
        } else {
            res.status(500).json({ error: 'Error retrieving YouTube download links' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
