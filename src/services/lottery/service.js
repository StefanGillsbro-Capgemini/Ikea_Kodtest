const { getDb } = require('../../shared/db');
const dayjs = require('dayjs');
const logger = require('../../shared/logger'); 

async function createEntry({ name, email, created_at }) {
  logger.info(`createEntry called with name=${name}, email=${email}, created_at=${created_at}`);

  if (!name || !email) {
    const err = new Error(`Invalid input: name or email is missing`);
    err.code = 'MISSING_REQUIRED_FIELDS';
    err.statusCode = 400;
    logger.warn({ err }, 'Missing required fields');
    return err;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const err = new Error(`Invalid email format: ${email}`);
    err.code = 'INVALID_EMAIL_FORMAT';
    err.statusCode = 400;
    logger.warn({ err }, 'Email format validation failed');
    return err;
  }

  const db = getDb();
  const startOfMonth = dayjs(created_at).startOf('month').toISOString();
  const endOfMonth = dayjs(created_at).endOf('month').toISOString();

  const existing = await db.get(
    'SELECT * FROM entries WHERE email = ? AND created_at >= ? AND created_at <= ?',
    email,
    startOfMonth,
    endOfMonth
  );

  if (existing) {
    const err = new Error(`Duplicate email ${email} for this month`);
    err.code = 'DUPLICATE_EMAIL_MONTH';
    err.statusCode = 400;
    logger.info({ email, created_at }, 'Duplicate entry detected');
    return err;
  }

  const res = await db.run(
    'INSERT INTO entries (name, email, created_at) VALUES (?, ?, ?)',
    name,
    email,
    created_at
  );

  logger.info({ id: res.lastID, name, email, created_at }, 'Entry successfully created');
  return { id: res.lastID, name, email, created_at };
}

async function listEntries({ from }) {
  const db = getDb();
  logger.info(`listEntries called with from=${from}`);
  if (from) {
    return db.all('SELECT * FROM entries WHERE created_at >= ?', from);
  }
  return db.all('SELECT * FROM entries');
}

async function drawWinner({ at } = {}) {
  const db = getDb();
  const drawTime = at || new Date().toISOString();
  const startOfMonth = dayjs(drawTime).startOf('month').toISOString();

  logger.info(`drawWinner called at ${drawTime}`);

  const entries = await db.all(
    'SELECT * FROM entries WHERE created_at >= ? AND created_at <= ?',
    startOfMonth,
    drawTime
  );

  if (!entries || entries.length === 0) {
    const err = new Error('No valid participants');
    err.code = 'NO_PARTICIPANTS';
    err.statusCode = 404;
    logger.warn('No participants found for draw');
    return err;
  }

  const idx = Math.floor(Math.random() * entries.length);
  const winner = entries[idx];

  await db.run(
    'INSERT INTO winners (entry_id, name, email, drawn_at) VALUES (?, ?, ?, ?)',
    winner.id,
    winner.name,
    winner.email,
    drawTime
  );

  logger.info({ winner, drawn_at: drawTime }, 'Winner drawn');
  return { ...winner, drawn_at: drawTime };
}

async function listWinners() {
  const db = getDb();
  logger.info('listWinners called');
  return db.all('SELECT * FROM winners ORDER BY drawn_at DESC');
}

module.exports = { createEntry, listEntries, drawWinner, listWinners };
