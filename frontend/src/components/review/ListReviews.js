import React from 'react'

const ListReviews = ({ reviews }) => {
    return (
        <div class="reviews p-5 w-75 ">
            <h5>Other's Reviews:</h5>
            <hr />
            {reviews && reviews.map(review => (
                <div key={review._id} class="review-card my-3 ">
                    <p class="review_user">by {review.name}</p>
                    <p class="review_comment">{review.comment}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews
