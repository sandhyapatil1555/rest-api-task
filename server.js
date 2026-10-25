
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// In-memory array to store notes
let notes = [];
let nextId = 1;

// GET: View all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// GET: View a single note
app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
});

// POST: Add a new note
app.post('/notes', (req, res) => {
    console.log("Request body:", req.body);

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: 'Title and content are required'
        });
    }

    const newNote = {
        id: nextId++,
        title: title,
        content: content
    };

    notes.push(newNote);

    res.status(201).json({
        message: 'Note added successfully',
        note: newNote
    });
});

// PUT: Update a note
app.put('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(n => n.id === id);

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: 'Title and content are required'
        });
    }

    note.title = title;
    note.content = content;

    res.json({
        message: 'Note updated successfully',
        note: note
    });
});

// DELETE: Delete a note
app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Note not found' });
    }

    notes.splice(index, 1);

    res.json({ message: 'Note deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
