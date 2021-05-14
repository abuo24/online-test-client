import React, { Component } from 'react';
import Countdown from 'react-countdown';
class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Countdown overtime={false} date={Date.now() + 10800000}>
                    Test yakunlandi !
                </Countdown>
            </div >
         );
    }
}

export default Time;