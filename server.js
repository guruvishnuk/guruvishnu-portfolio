import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendProjectInquiry, getTransporter } from './server/smtpHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health & Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Guruvishnu Portfolio SMTP Mailer',
    timestamp: new Date().toISOString(),
  });
});

// Verify SMTP Connection
app.get('/api/smtp-verify', async (req, res) => {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    res.json({ success: true, message: 'SMTP Transporter credentials verified successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Project Inquiry Endpoint
app.post('/api/project-inquiry', async (req, res) => {
  try {
    const result = await sendProjectInquiry(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error('SMTP Mail error:', err);
    res.status(500).json({ error: err.message || 'SMTP transmission failure' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Guruvishnu Portfolio SMTP Service running at: http://localhost:${PORT}`);
  console.log(`   - Endpoint: POST http://localhost:${PORT}/api/project-inquiry`);
  console.log(`   - Health:   GET  http://localhost:${PORT}/api/health\n`);
});
