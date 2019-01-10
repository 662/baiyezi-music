import React from 'react';

export default class Player extends React.Component {
    handleEnd = () => {};

    render() {
        return (
            <div>
                <audio src="" controls={true} onEnded={this.handleEnd}>
                    您的浏览器不支持 video 标签。
                </audio>
            </div>
        );
    }
}
