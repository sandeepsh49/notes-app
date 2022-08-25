import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote, updateNote } from '../features/notes/noteSlice';

function NoteForm(props) {
	const [text, setText] = useState('');

	const dispatch = useDispatch();

	const onSubmit = e => {
		e.preventDefault();

		if (props.edit) {
			props.updateEdit();
			dispatch(updateNote([props.noteId, { text }]));
		} else {
			dispatch(createNote({ text }));
			setText('');
		}
	};

	return (
		<section className="form">
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="text">Note</label>
					<textarea
						name="text"
						id="text"
						rows="5"
						value={text}
						placeholder={props.edit ? props.noteText : ''}
						onChange={e => setText(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<button className="btn btn-block" type="submit">
						Add Note
					</button>
				</div>
			</form>
		</section>
	);
}

export default NoteForm;
