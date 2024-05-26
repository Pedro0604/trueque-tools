import Comment from "./Partials/Comment";

export default function CommentsList({ comments }) {
    console.log(JSON.stringify(comments, null, 2))
    return (
        <div className="p-6 bg-gray-300 dark:bg-gray-800 rounded-b-lg rounded-t-sm">
            {comments.length > 0 ? (
                <>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                        Comentarios:
                    </h2>
                    <div className="flex flex-col gap-4">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                            >
                                <Comment comment={comment} />
                                {comment.response && (
                                    <Comment
                                        comment={comment.response}
                                        isResponse
                                        className={`mt-2`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    No hay comentarios
                </h2>
                )}
        </div>
    );
}
