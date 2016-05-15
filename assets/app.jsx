var $ = require('jquery');
var ReactDOM = require('react-dom');
var React = require('react');
var marked = require('marked');

var Cookies = require('js-cookie');
var csrftoken = Cookies.get('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var CommentBox = React.createClass({
    ws: new WebSocket("ws://127.0.0.1:5678/"),
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({data: comments.concat(data)});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        this.ws.onmessage = function (event) {
            this.loadCommentsFromServer();
        }.bind(this);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList url={this.props.url} data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var comments = [];
        this.props.data.forEach(function(comment) {
            comments.push(
                <Comment comment={comment} author={comment.owner} key={comment.id} url={this.props.url}>
                    {comment.title}
                </Comment>);
        }.bind(this));
        return (
            <div className="commentList">
                {comments}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return {owner: '', title: ''};
    },
    handleAuthorChange: function (e) {
        this.setState({owner: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({title: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var owner = this.state.owner.trim();
        var title = this.state.title.trim();
        if (!title || !owner) {
            return;
        }
        this.props.onCommentSubmit({owner: owner, title: title});
        this.setState({owner: '', title: ''});
    },
    render: function () {
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
                <input type="submit" value="Post"/>
            </form>
        );
    }
});

var Comment = React.createClass({
    handleDelete: function() {
        $.ajax({
            url: this.props.url + this.props.comment.id + '/',
            type: 'DELETE'
        });
    },
    rawMarkup: function () {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    },
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
                <DeleteButton delete={this.handleDelete}/>
            </div>
        );
    }
});

var DeleteButton = React.createClass({
    render: function() {
        return(
            <button onClick={this.props.delete}>Delete</button>
        )
    }
});

var comments = <CommentBox url="/api/comments/"/>;
ReactDOM.render(
    comments,
    document.getElementById('content')
);
