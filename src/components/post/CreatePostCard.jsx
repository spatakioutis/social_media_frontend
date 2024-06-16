import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import '../../styles/post/CreatePostCard.css'

const CreatePostCard = ({openModal}) => {
    return (
        <div className="create--post--card" onClick={openModal}>
            <AddPhotoAlternateIcon 
                        fontSize="medium"
                        sx={{color: 'cyan'}}/>
            <h4>Click here to upload a new post!</h4>
        </div> 
    )
}

export default CreatePostCard