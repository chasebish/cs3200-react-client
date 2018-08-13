/* eslint-disable */

import React from 'react'

export default class Search extends React.Component {

    componentDidMount() {
        console.log(this.props.location.search)
    }

    render() {

        return (
            <h1>Search Component</h1>
        )

    }

}