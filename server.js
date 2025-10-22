const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory data store
let nextId = 3;
let items = [
    { id: 1, title: 'Sample item 1', completed: false },
    { id: 2, title: 'Sample item 2', completed: true }
];

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', uptimeSec: process.uptime() });
});

// RESTful API endpoints
app.get('/api/items', (req, res) => {
    res.json(items);
});

app.get('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
});

app.post('/api/items', (req, res) => {
    const { title, completed } = req.body || {};
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }
    const newItem = {
        id: nextId++,
        title: title.trim(),
        completed: Boolean(completed)
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Item not found' });

    const { title, completed } = req.body || {};
    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Title must be a non-empty string' });
        }
        items[idx].title = title.trim();
    }
    if (completed !== undefined) {
        items[idx].completed = Boolean(completed);
    }
    res.json(items[idx]);
});

app.delete('/api/items/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Item not found' });
    const [deleted] = items.splice(idx, 1);
    res.json(deleted);
});

// Serve static front-end
app.use(express.static(path.join(__dirname, 'public')));

// 404 for API routes not matched
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


