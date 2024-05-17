import './DeleteNoteForm.scss'
import PopupContainer from '../../molecules/PopupContainer/PopupContainer';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';

function DeleteNoteForm({noteIdToDelete, isDeleteNoteFormOpen, deleteNote, deleteFormOpenStateHandler}) {
  return (
    <PopupContainer open={isDeleteNoteFormOpen}>
        <div className='delete-note'>
            <div className='delete-note__header'>
                <h1>Delete note</h1>
                <Button icon={<Icon name='close' height='24' width='24'/>} clickHandler={deleteFormOpenStateHandler}/>
            </div>
            <p className='delete-note__text'>Are you sure you want to delete this note?</p>
            <div className='delete-note__ctas'>
              <Button text='Cancel' buttonType='ghost' clickHandler={deleteFormOpenStateHandler} />
              <Button text='Delete' buttonType='danger' clickHandler={(e) => {
                deleteNote(noteIdToDelete);
                deleteFormOpenStateHandler(e);
              }} />
            </div>
        </div>
    </PopupContainer>
  )
}

export default DeleteNoteForm;