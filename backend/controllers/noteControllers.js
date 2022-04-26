const asyncHandler = require('express-async-handler')

// desc:    Get Note
// route:   GET /api/notes
// access:  Private
const getNote = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Get note"
    })
})

// desc:    Create Note
// route:   POST /api/notes
// access:  Private
const createNote = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }

    res.status(200).json({
        message: "Create note"
    })
})

// desc:    Update Note
// route:   PUT /api/notes/:id
// access:  Private
const updateNote = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Update note ${req.params.id}`
    })
})

// desc:    Delete Note
// route:   DELETE /api/notes/:id
// access:  Private
const deleteNote = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Delete note ${req.params.id}`
    })
})

module.exports = {
    getNote,
    createNote,
    updateNote,
    deleteNote
}