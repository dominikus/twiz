import React from 'react';
import hello from 'hellojs';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			connectedToTwitter: false,
			user: undefined,
			query: false,
			results: undefined
		};

		// initialize hello.js
		hello.init({
			twitter: '0J9dQ43zRk9Dt5Y2c7aCwr5z4'
		}, { 
			redirect_uri: 'redirect.html',
			oauth_proxy: 'https://dominiku.indus.uberspace.de/oauthproxy'
		});

		// bind some local, non-React functions
		this.checkKeyPress = this.checkKeyPress.bind(this);
		this.connectToTwitter = this.connectToTwitter.bind(this);
		this.logout = this.logout.bind(this);
	}

	connectToTwitter() {
		hello('twitter').login().then(
			() => {
				console.log('logged in to twitter');

				// fetch username from twitter
				hello('twitter').api('me').then(
					(_user) => {
						console.log(_user);
						this.setState({
							connectedToTwitter: true,
							user: _user
						});
					},
					(e) => {
						console.log('couldnt fetch profile:');
						console.log(e);
					}
				);
			},
			(e) => {
				console.log('couldnt log in:');
				console.log(e);
			}
		);
	}

	logout() {
		hello('twitter').logout().then(
			() => {
				this.setState({
					connectedToTwitter: false,
					user: undefined
				});
			}, 
			(e) => {
				console.log('couldnt log out of twitter:');
				console.log(e);
			}
		);
	}

	checkKeyPress(e){
		if(e.key == 'Enter'){
			let _query = this.refs.searchBox.value;

			this.setState({
				query: _query
			});

			// send to twitter api
			hello('twitter').api('/search/tweets.json?q=' + encodeURI(_query)).then(
				(r) => {
					console.log(r);
					this.setState({
						query: false,
						results: r
					});
				},
				(e) => {
					console.log('error searching for ' + _query + ':');
					console.log(e);

					this.setState({
						query: false
					});
				}
			)

		}
	}

	render() {
		console.log('render');
		console.log(this.state);
		if(!this.state.connectedToTwitter){
			return <div>
				<button onClick={this.connectToTwitter}>Connect to Twitter</button>
				</div>;
		} else {
			if(this.state.query){
				return <div>
					<p>Connected as <i>{this.state.user.screen_name}</i>. <button onClick={this.logout}>Logout</button></p>
					<input type="text" disabled value={this.state.query} ref="searchBox" size="60"/>
				</div>;
			} else {
				let resultList = [];

				if(this.state.results && this.state.results.statuses && this.state.results.statuses.length > 0){
					this.state.results.statuses.forEach((d) => {
						resultList.push(
							<div className="result" key={d.user.screen_name + d.created_at}>
								<img className="tweeter" src={d.user.profile_image_url} />
								<div className="right-column">
									<p>@{d.user.screen_name} {d.created_at}</p>
									<h1>{d.text}</h1>
								</div>
							</div>
						);
					});
				}

				return <div>
					<p>Connected as <i>{this.state.user.screen_name}</i>. <button onClick={this.logout}>Logout</button></p>
					<input type="text" ref="searchBox" placeholder="Press Enter to Submit" size="60" onKeyPress={this.checkKeyPress}/>
					<div className="results">{resultList}</div>
				</div>;
			}
		}
	}
}
