import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Sta alle origins (= lokale verzoeken) toe (omdat frontend op andere poort draait dan backend ; dit is voor lokale tests)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

// API-key versturen naar de frontend
app.get('/api/key', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

// API-URL versturen naar frontend
app.get('/api/config', (req, res) => {
    res.json({ apiUrl: process.env.API_URL });
});

app.listen(PORT, () => {
    console.log(`server draait op http://localhost:${PORT}`);
});