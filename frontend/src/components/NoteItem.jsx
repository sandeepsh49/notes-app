import { useDispatch } from 'react-redux';
import { deleteNote } from '../features/notes/noteSlice';

function NoteItem({ note, handleEdit }) {
	const dispatch = useDispatch();

	return (
		<div className="note">
			<button onClick={e => handleEdit(note._id, note.text)}>Edit</button>
			<div>{new Date(note.createdAt).toLocaleString('en-US')}</div>
			<h2>{note.text}</h2>
			<button onClick={() => dispatch(deleteNote(note._id))} className="close">
				&#10006;
			</button>
		</div>
	);
}

export default NoteItem;
