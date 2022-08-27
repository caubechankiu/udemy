import React from 'react'

class OAuthCallback extends React.Component {
    componentDidMount() {
        localStorage.setItem("access-token", this.props.location.query.acess_token);
        window.location.href = "/";
    }
    render() {
        return <div></div>;
    }
}
export default OAuthCallback