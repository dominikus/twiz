import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import App from 'App';

import d3_request from "d3-request";

import "../html/index.html";
import "../html/redirect.html";
import "../sass/main.sass";


ReactDOM.render(
	<App/>, 
	document.getElementById('app')
);