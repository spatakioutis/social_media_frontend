import React from 'react'
import { Link } from 'react-router-dom'

const HashtagText = (props) => {
    const parts = props.text.split(/(#\w+)/g)

    return (
        <span className={props.className}>
            {parts.map((part, index) =>
                part.startsWith('#') ? (
                    <Link 
                        key={index} 
                        to={`/hashtag?tag=${part.substring(1).toLowerCase()}`} 
                        className="hashtag-link"
                    >
                        {part}
                    </Link>
                ) : (
                    part
                )
            )}
        </span>
    )
}

export default HashtagText