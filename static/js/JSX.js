/**
 * Created by Jay on 16/9/21.
 */
"use strict";


// 倒计时组件
(function () {
    var CountDownTimeBox = React.createClass({
        getInitialState: function () {
            return {
                "days": 0,
                "hours": 0,
                "minutes": 0,
                "seconds": 0
            }
        },
        getLastSeconds: function () {
            var curTime = new Date();
            var targetTime = new Date(this.props.dateTime);
            var difference = parseInt((targetTime - curTime) / 1000);

            var days = parseInt(difference / 86400);
            var hours = parseInt(difference % 86400 / 3600);
            var minutes = parseInt(difference % 86400 % 3600 / 60);
            var seconds = parseInt(difference % 86400 % 3600 % 60);

            this.setState({
                "days": days,
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds
            })
        },
        componentDidMount: function () {
            this.timer = window.setInterval(this.getLastSeconds, 1000);
        },
        render: function () {
            return (
                <div>
                    <span className="days">{this.state.days}</span>天
                    <span className="hours">{this.state.hours}</span>时
                    <span className="minutes">{this.state.minutes}</span>分
                    <span className="seconds">{this.state.seconds}</span>秒
                </div>
            )
        }
    });

    ReactDOM.render(
        <CountDownTimeBox dateTime="2016-10-03"/>,
        document.getElementById("count-down-timeBox")
    );
})();


// 评论框组件
(function () {
    var CommentsList = React.createClass({
        render: function () {
            var newNodes = this.props.commentList.map(function (item, index, array) {
                return (
                    <li key={item.id}>
                        <div className="author">{item.author}</div>
                        <div className="comment">{item.comment}</div>
                    </li>
                )
            });

            return (
                <div className="comments-list">
                    <ul>
                        {newNodes}
                    </ul>
                </div>
            )
        }
    });


    var CommentsForm = React.createClass({
        getInitialState: function () {
            return {
                author: '',
                comment: ''
            }
        },
        handleAuthorChange: function (e) {
            this.setState({
                author: e.target.value
            })
        },
        handleCommentChange: function (e) {
            this.setState({
                comment: e.target.value
            })
        },
        handleFormCommit: function (e) {
            e.preventDefault();
            var author = this.state.author.trim();
            var comment = this.state.comment.trim();

            if(!author){
                window.alert("请填写姓名");
                return ;
            }
            if(!comment){
                window.alert("请填写祝福语");
                return ;
            }

            this.props.onFormSubmit({
                "author": author,
                "comment": comment
            });

            this.setState({
                author: '',
                comment: ''
            })
        },
        render: function () {
            return (
                <div className="comments-form">
                    <form onSubmit={this.handleFormCommit}>
                        <div className="author-tr">
                            <label htmlFor="input-author">姓名：</label>
                            <input type="text" onChange={this.handleAuthorChange} value={this.state.author}/>
                        </div>
                        <div className="comment-tr">
                            <label htmlFor="textarea-comment">祝福：</label>
                            <textarea onChange={this.handleCommentChange} value={this.state.comment}/>
                        </div>
                        <input className="submitBtn" type="submit" value="提交"/>
                    </form>
                </div>
            )
        }
    });


    var CommentsBox = React.createClass({
        getInitialState: function () {
            return {
                commentList: []
            }
        },
        handleGetAjaxComments: function (comment) {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({
                        commentList: data
                    })
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        handleCommentSubmit: function (comment) {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: comment,
                success: function(data) {
                    this.setState({
                        commentList: data
                    })
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        componentDidMount: function () {
            this.handleGetAjaxComments();
            window.setInterval(this.handleGetAjaxComments, 10000);
        },
        render: function () {
            return (
                <div className="comments-box">
                    <CommentsForm onFormSubmit={this.handleCommentSubmit}/>
                    <CommentsList commentList={this.state.commentList}/>
                </div>
            )
        }
    });


    ReactDOM.render(
        <CommentsBox url="/api/comments" pollInterval={2000} />,
        document.getElementById("comments")
    );
})();


(function () {
    var MusicBox = React.createClass({
        getInitialState: function () {
            return {
                paused: false,
                btnClass: "audioBtn play"
            }
        },
        handlePaused: function () {
            if(this.state.paused){
                this.setState({
                    paused: false,
                    btnClass: "audioBtn play"
                });
                this.refs.audio_ele.play();
            } else {
                this.setState({
                    paused: true,
                    btnClass: "audioBtn"
                });
                this.refs.audio_ele.pause();
            }
        },
        render: function () {
            return (
                <div className="music-box">
                    <audio className="audioObj" src={this.props.url} autoPlay="autoPlay" loop="true" ref="audio_ele"></audio>
                    <a className={this.state.btnClass} href="javascript:;" onClick={this.handlePaused}></a>
                </div>
            )
        }
    });

    ReactDOM.render(
        <MusicBox url="http://m2.music.126.net/kfGvPe7fA0WotDPlI0seXA==/6661940952771878.mp3"/>,
        document.getElementById("music-box")
    );
})();
