const React = require('react');
const $ = require('jquery');
const marked = require('marked');


class Comment extends React.Component {
    static propTypes = {
        comment: React.PropTypes.object.isRequired,
        url: React.PropTypes.string.isRequired,
        children: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired
    };

    handleDelete() {
        $.ajax({
            url: `${this.props.url}, ${this.props.comment.id} /`,
            type: 'DELETE'
        });
    }

    rawMarkup() {
        const rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }

    render() {
        return (
          <div className="comment">
            <h2 className="commentAuthor">
              {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        );
    }
}
module.exports = Comment;
