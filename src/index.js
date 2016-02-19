'use strict';

import 'babel-core/register';
import 'babel-polyfill';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Channel from './helpers/Channel';
import ReadlineMain from './pages/ReadlineMain';

let pageId = document.location.pathname.split('/')[1] || 'index';

ReactDOM.render(
  (<ReadlineMain pageId={pageId} />),
  document.getElementById('readline-container')
);