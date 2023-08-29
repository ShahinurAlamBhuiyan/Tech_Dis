import Image from 'next/image'
import React from 'react'

const Individual_Comment = ({comment}) => {
    console.log(comment)
    return (
            <div className="flex space-x-3  border-b-2">
                <div className='flex-shrink-0 '>
                    <Image
                        height={100}
                        width={100}
                        className="rounded-full w-10 h-10"
                        src={(comment.authorImageUrl)? comment.authorImageUrl : "/images/default.jpg"}
                        alt="author-image"
                    />
                </div>
                <div>
                    <div className="text-sm">
                        <a
                            href="#"
                            className="font-medium text-gray-900"
                        >
                            {(comment?.authorUsername) ? (comment?.authorUsername) : 'guest-user'}
                        </a>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                        <p>{comment.body}</p>
                    </div>
                </div>
            </div>
    )
}

export default Individual_Comment