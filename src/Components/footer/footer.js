import React,{Component} from 'react';
import "../footer/footer.css"
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='footer_1'>
                <div className='container'>
                    <p className='text-light text-center pt-3' style={{fontSize:'15px'}}>&copy; 2021 Copyright:</p>
                </div>
            </div>
         );
    }
}
export default Footer;