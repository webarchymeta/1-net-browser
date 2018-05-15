'use strict';

import React from 'react';
import CreateReactClass from 'create-react-class';

const normalizedUri = input => {
    const prefix = 'http://';
    if (!/^(\s*[^:\/]+)(:\/\/)/g.test(input) && !prefix.includes(input)) {
        input = prefix + input;
    }
    return input;
};

const BrowserNavbarBtn = CreateReactClass({
    render: function () {
        return <a href="#" className={this.props.disabled ? 'disabled' : ''} title={this.props.title} onClick={this.props.onClick}><i className={'fa fa-' + this.props.icon} /></a>
    }
});

const BrowserNavbarLocation = CreateReactClass({
    onKeyDown: function (e) {
        if (e.keyCode == 13) {
            let url = normalizedUri(e.target.value);
            this.props.onChangeLocation(url);
            this.props.onEnterLocation(url);
        }
    },
    onChange: function (e) {
        this.props.onChangeLocation(e.target.value);
    },
    render: function () {
        return <input type="text" onKeyDown={this.onKeyDown} onChange={this.onChange} onContextMenu={this.props.onContextMenu} value={this.props.page.location} />
    }
});

const BrowserNavbar = CreateReactClass({
    render: function () {
        return <div id="browser-navbar">
            <BrowserNavbarBtn title="Rewind" icon="angle-double-left fa-lg" onClick={this.props.onClickHome} disabled={!this.props.page.canGoBack} />
            <BrowserNavbarBtn title="Back" icon="angle-left fa-lg" onClick={this.props.onClickBack} disabled={!this.props.page.canGoBack} />
            <BrowserNavbarBtn title="Forward" icon="angle-right fa-lg" onClick={this.props.onClickForward} disabled={!this.props.page.canGoForward} />
            <BrowserNavbarBtn title="Refresh" icon="circle-thin" onClick={this.props.onClickRefresh} disabled={!this.props.page.canRefresh} />
            <div className="input-group">
                <BrowserNavbarLocation onEnterLocation={this.props.onEnterLocation} onChangeLocation={this.props.onChangeLocation} onContextMenu={this.props.onLocationContextMenu} page={this.props.page} />
            </div>
        </div>
    }
});

export default BrowserNavbar;
