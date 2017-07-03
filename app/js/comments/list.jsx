const React = require('react');

const Comment = require('./comment');

const CommentList = function commentsList(props) {
    let comments = [];
    props.data.forEach((comment) => {
        comments.push(
          <Comment comment={comment} author={comment.owner} key={comment.id} url={props.url}>
            {comment.title}
          </Comment>);
    });
    return (
      <div className="commentList">
        {comments}
      </div>
    );
};
CommentList.propTypes = {
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            owner: React.PropTypes.string,
            id: React.PropTypes.number,
            url: React.PropTypes.url
        })
    ),
    url: React.PropTypes.string
};
module.exports = CommentList;
