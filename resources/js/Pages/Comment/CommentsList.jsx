import Comment from "./Partials/Comment";

export default function CommentsList({ comments }) {
    return (
        <div className="p-6 bg-gray-300 dark:bg-gray-700 rounded-b-lg rounded-t-sm">
            {comments ? (
                <>
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                        Comentarios:
                    </h2>
                    {comments.map((comment) => (
                        <div className="mb-3">
                            <Comment key={comment.id} comment={comment} />
                            {comment.response && (
                                <Comment
                                    key={comment.response.id}
                                    comment={comment.response}
                                    isResponse
                                    className={`mt-2`}
                                />
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <h2>No hay comentarios</h2>
            )}
        </div>
    );
}
