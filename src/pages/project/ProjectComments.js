import { useState} from 'react'
import Avatar from '../../components/Avatar'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js'

export default function ProjectComments({ project }) {
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd],
          })
          if (!response.error) {
            setNewComment('')
          }
    }

  return (
    <div className='project-comments'>
        <h4>Project Comments</h4>

        <ul>
            {project.comments.length > 0 && project.comments.map(comment => (
                <li key={comment.id}>
                    <div className="comment-author">
                        <Avatar src={comment.photoURL} />
                        <p>{comment.displayName}</p>
                    </div>
                    <div className="comment-date">
                        <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                    </div>
                    <div className="comment-content">
                        {comment.content}
                    </div>
                </li>
            ))}
        </ul>

        <form onSubmit={handleSubmit} className="add-comment">
            <label>
                <span>Add new comment:</span>
                <textarea
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                ></textarea>
            </label>
            <button className="btn">Add comment</button>
        </form>
        
    </div>
  )
}
