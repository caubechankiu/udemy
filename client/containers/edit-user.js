import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';

class EditUser extends React.Component {
    componentDidMount() {
        if (!localStorage.getItem("access_token")) {
            window.location.href = "/";
        }
    }
    render() {
        if (this.props.username && this.props.username != '') {
            return (
                <div className="container">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 sidebar-profile">
                        <div className="photo-profile" style={{ backgroundImage: 'url(' + ('/api/resource/images?src=' + this.props.photo + '&w=200&h=200') + ')' }}></div>
                        <p className="username-profile">
                            {this.props.username}
                        </p>
                        <ul className="menu-profile">
                            <li>
                                <Link to="/user/edit-profile" activeClassName="active"
                                    onlyActiveOnIndex={true}>
                                    <span className='glyphicon glyphicon-user'></span>{' '}Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/edit-photo" activeClassName="active"
                                    onlyActiveOnIndex={true}><span className='glyphicon glyphicon-picture'></span>{' '}Photo</Link>
                            </li>
                            <li>
                                <Link to="/user/edit-account" activeClassName="active"
                                    onlyActiveOnIndex={true}><span className='glyphicon glyphicon-edit'></span>{' '}Account</Link>
                            </li>
                            <li>
                                <Link to="/user/edit-credit" activeClassName="active"
                                    onlyActiveOnIndex={true}><span className='glyphicon glyphicon-credit-card'></span>{' '}Credit Cards</Link>
                            </li>
                            <li>
                                <Link to="/user/edit-danger-zone" activeClassName="active"
                                    onlyActiveOnIndex={true}><span className='glyphicon glyphicon-trash'></span>{' '}Danger Zone</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 edit-user-box">
                        {this.props.children}
                    </div >
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

EditUser = connect((state, props) => {
    if (state.user && state.user.username) {
        return {
            photo: state.user.photo,
            username: state.user.username
        }
    }
    return props
})(EditUser)

export default EditUser