const React = require('react');
const $ = require('jquery');

const CommentList = require('./list');
const CommentForm = require('./form');

class CommentBox extends React.Component {
    static propTypes = {
        url: React.PropTypes.string.isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.number)
    };

    static defaultProps = {
        // ws: new WebSocket('ws://127.0.0.1:5678/')
    };

    constructor(props) {
        super(props);
        this.state = {data: []};
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        // this.ws.onmessage = () => {
        //     this.loadCommentsFromServer();
        // };
    }

    handleCommentSubmit(comment) {
        const comments = this.state.data;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => {
                this.setState({data: comments.concat(data)});
            },
            error: (xhr, status, err) => {
                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => this.setState({data}),
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    render() {
        return (
          <div className="commentBox">
            <h1>Comments</h1>
            <CommentList url={this.props.url} data={this.state.data} />
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
          </div>
        );
    }
}
module.exports = CommentBox;
