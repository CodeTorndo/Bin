import React from 'react';
import { Link } from 'react-router';

export default () => (
	<div className="mobile-toolbar">
		<Link to="/nav" activeClassName="active" className="toolbar-btn">☰</Link>
		<Link to={'/tick-trade'} activeClassName="active" className="toolbar-btn"><img src="/public/trade.svg" /></Link>
		<Link to={`/watchlist-mobile`} activeClassName="active" className="toolbar-btn"><img src="/public/watchlist.svg" /></Link>
		<Link to={'/portfolio-mobile'} activeClassName="active" className="toolbar-btn"><img src="/public/portfolio.svg" /></Link>
		<Link to={`/profit-table-mobile`} activeClassName="active" className="toolbar-btn"><img src="/public/profit.svg" /></Link>
		<Link to={'/statement-mobile'} activeClassName="active" className="toolbar-btn"><img src="/public/statement.svg" /></Link>
		<Link to={`/settings-mobile`} activeClassName="active" className="toolbar-btn"><img src="/public/settings.svg" /></Link>
	</div>
);
