import React, { Component } from 'react';

const wrapAuth = ComposedComponent => class WrapComponent extends Component {
    // 构造
    constructor(props) {
        super(props);
    }

    render() {
        if (this.getAuth(this.props.auth)) {
            return <ComposedComponent  {...this.props} />;
        } else {
            return null;
        }
    }

    getAuth(auth) {
        console.log(auth)
        return true
    }
};

wrapAuth.propTypes = {
    auth: 'string'
}

export default wrapAuth