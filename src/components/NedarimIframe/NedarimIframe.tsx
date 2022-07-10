import React from "react";
import './NedarimIframe.css'

const NedarimIframe: React.FC = (props) => {

    return (
        <div>
            <iframe title="nedarim-iframe" className="nedarim-iframe"
                    src="https://www.matara.pro/nedarimplus/iframe/"
                    scrolling="no"/>
            {/*<div className="connect-alert" id="WaitNedarimFrame"><img src="waitnew.gif"/>*/}
            {/*    <br/>Connecting to PCI Server...*/}
            {/*</div>*/}

        </div>
    );
};

export default NedarimIframe;
