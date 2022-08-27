import React from 'react'

class OAuthCallback extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        localStorage.setItem("access_token", this.props.location.query.access_token);
        window.location.href = "/";
    }
    render() {
        return <div></div>;
    }
}
export default OAuthCallback