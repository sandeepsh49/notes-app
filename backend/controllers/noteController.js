const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

// desc:    Get Note
// route:   GET /api/notes
// access:  Private
const getNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find({ user: req.user.id });
	res.status(200).json(notes);
});

// desc:    Set Note
// route:   POST /api/notes
// access:  Private
const setNote = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}

	const note = await Note.create({
		text: req.body.text,
		user: req.user.id,
	});

	res.status(200).json(note);
});

// desc:    Update Note
// route:   PUT /api/notes/:id
// access:  Private
const updateNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);

	if (!note) {
		res.status(400);
		throw new Error('Note not found!');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found!');
	}

	// Make sure the loggedIn user matches the note user
	if (note.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized!');
	}

	const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json(updatedNote);
});

// desc:    Delete Note
// route:   DELETE /api/notes/:id
// access:  Private
const deleteNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);

	if (!note) {
		res.status(400);
		throw new Error('Note not found!');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found!');
	}

	// Make sure the loggedIn user matches the note user
	if (note.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized!');
	}

	await note.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getNotes,
	setNote,
	updateNote,
	deleteNote,
};
