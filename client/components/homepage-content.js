import React from 'react'
import PanelCourses from './panel-courses'
import { ProgressBar } from 'react-bootstrap'

class HomepageContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listCourses: [],
            progress: 0,
            bsStyle: ['success', 'info', 'warning', 'danger'][Math.floor(Math.random() * 4)]
        }
    }
    componentDidMount() {
        $.ajax({
            method: "GET",
            url: "/api/courses/get-courses-homepage",
            success: (data, status) => {
                if (data.code == 200) {
                    setTimeout(() => {
                        this.setState({ listCourses: data.listCourses })
                    }, 500)
                }
            },
            xhr: () => {
                let xhr = new window.XMLHttpRequest()
                xhr.onprogress = (evt) => {
                    if (evt.lengthComputable) {
                        let percentComplete = Math.ceil(evt.loaded * 100.0 / evt.total)
                        this.setState({ progress: percentComplete })
                    }
                }
                return xhr
            }
        })
    }

    render() {
        if (this.state.listCourses.length == 0)
            return <ProgressBar bsStyle={this.state.bsStyle} active now={this.state.progress} />
        return <div>
            {this.state.listCourses.map((category, index) => {
                if (!category.courses || category.courses.length == 0)
                    return
                return <PanelCourses key={index} courses={category.courses} title={category.name} id={category._id} />
            })}
        </div>
    }
}

export default HomepageContent