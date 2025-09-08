const express = require('express');
const router = express.Router();
const service = require('./service');

router.post('/entries', async (req, res) => {
  const now = new Date().toISOString();
  const entry = await service.createEntry({ ...req.body, created_at: now });
  if (entry instanceof Error) {
    return res.status(entry.statusCode).json({ message: entry.message });
  }
  res.status(201).json(entry);
});

router.get('/entries', async (req, res) => {
  const from = req.query.from;
  const entries = await service.listEntries({ from });
  res.json(entries);
});

router.post('/draw', async (req, res) => {
  
    const winner = await service.drawWinner({ at: req.body.at });
    if (winner instanceof Error) {
      return res.status(winner.statusCode).json({ message: winner.message });
    }

    res.json(winner);
});

router.get('/winners', async (req, res) => {
  const winners = await service.listWinners();
  res.json(winners);
});

module.exports = router;
