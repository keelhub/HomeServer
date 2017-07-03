const React = require('react');


class CommentForm extends React.Component {
    static propTypes = {
        onCommentSubmit: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            title: ''
        };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({owner: e.target.value});
    }

    handleTextChange(e) {
        this.setState({title: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const owner = this.state.owner.trim();
        const title = this.state.title.trim();
        if (!title || !owner) {
            return;
        }
        this.props.onCommentSubmit({owner, title});
        this.setState({owner: '', title: ''});
    }

    render() {
        return (
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={this.state.owner}
              onChange={this.handleAuthorChange}
            />
            <input
              type="text"
              placeholder="Say something..."
              value={this.state.title}
              onChange={this.handleTextChange}
            />
            <input type="submit" value="Post" />
          </form>
        );
    }
}
module.exports = CommentForm;
