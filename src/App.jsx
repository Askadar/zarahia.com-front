import React, { Component } from 'react';
import { Container, MetaSidebar, AssetsSidebar, ArticleContent, Title, Header, SectionHeader, Paragraph, CodeLine, CodeBlock, List } from './ViewKit';

class App extends Component{
	render(){
		return(
			<Container className="container">
				<MetaSidebar>Meta tags</MetaSidebar>
				<ArticleContent>
					<Title>Creating web-site from utter scratch and libraries on Node.js and Express as a lonely Full-stack web architect.
					</Title>
					<Paragraph>
					I always wanted to start myself some nice blog, where I would share my ideas and thoughts, or maybe even insights on things I discovered, learned or that just got into my mind and started jogging around it.
					</Paragraph>
					<Paragraph>
					Alongside with that I also liked to tinker with servers and “stuff”.</Paragraph>
					<Paragraph>
					And both of these things I never really done solidly. Yes, I worked part network engineer while doing some projects and building up layers to support application’s backend, but I never had solid thing that I built over long period of time.</Paragraph>
					<Paragraph>
					So, these “problems” lead me to deciding to create and maintain a fully custom-built blog-site-etc. To tinker and to concentrate my efforts on it. Also, I’ll document all (I hope to, at least) my progress in the form of small tutorials of creating my web-site from scratch. (I also hope to share some of my experience with multitude of programming oriented things I learned along my way)</Paragraph>
					<Header>
					To the stars! (or routing via ‘*’ precisely speaking)</Header>
					<Paragraph>
					From the get-go stack that I plan to use:</Paragraph>
					<List>
						<dt>Back</dt><dd>Node.js via Express, MongoDB via Monk</dd>
						<dt>Front</dt><dd>React with MobX</dd>
					</List>
					<Paragraph>
					Also, I’m thinking about way to handle posts formatting and I incline towards either Markdown or custom-built parser(?) of texted jsx-like syntax, but latter would probably be huge overhead and unnecessary complications.</Paragraph>
					<Paragraph>
					For the sake of this tutorial I’ll be doing basic express setup via npm (if you don’t know any of fancy words I used so far, I’ll probably create small tuts about all of them and link them, but all in due time)</Paragraph>
					<SectionHeader>Tasty stuff</SectionHeader>
					<Paragraph>First, I’ll init npm package and git repo (latter absolutely optional, but kinda recommended):</Paragraph>
					<CodeLine>npm init</CodeLine>
					<Paragraph>
					This will show bunch of options, all of which I accepted with npm defaults. (You may want to pay attention to licensing, if you care about that part)</Paragraph>
					<CodeLine>git init</CodeLine>
					<Paragraph>Which gave me a sublte response of </Paragraph>
					<CodeLine>Initialized empty Git repository in …/htdocs/node/zarahia.com/.git/</CodeLine>
					<Paragraph>Next I installed back-end package(s) that will be used momentarily:</Paragraph>
					<CodeLine>npm i -S express@^4</CodeLine>
					<Paragraph>Which (@^4) installs express version 4 with most recent sub-version.</Paragraph>
					<Paragraph>
					[Notice] i is shorthand for install and -S is shorthand for --save (there’s also shorthand -D for --save-dev, that I’ll use in next-y tuts).</Paragraph>
					<SectionHeader>
					Real code go-go!</SectionHeader>
					<Paragraph>
					So far I’ve been setting up project and talking bunch of not-so-important words and sentences, now comes code that will server up a basic html:5 emmeted page with my oh so great article:</Paragraph>
					<CodeBlock>{`
// Require (import) and initialise express
const express = require('express');
const server = express()
// Set up port depending on current env (extra tut on this in the future)
const PORT = process.env.NODE_ENV === 'production' ? 80 : 81
// Setting up basic route that will return any static file (basically any file found on server with extension and not normal request like example.com/catalog)
server.use(express.static('public'));
// Start listening and log out port that was used
server.listen(PORT, function () {
console.log(\`Example app listening on port \${PORT}!\`)
})
		`}
					</CodeBlock>
					<Paragraph>It gives me small console response of <CodeLine> Example app listening on port 81!</CodeLine> and takes terminal out of my control to keep node process alive.</Paragraph>
					<Paragraph>If I go to ‘localhost:81’ in my browser I get following nice view</Paragraph>
					<img src="#" alt="raw html pic"/>
					<Paragraph>
					Ah, unformatted raw HTML, sorry that you have to cleanse your eyes now, but it was necessary. But it served my index.html, just as expected.</Paragraph>
					<Paragraph>
					So, I’ve got myself cool Node.express server going, yay!</Paragraph>
					<Paragraph>
					Yes, I know that’s just express’ own get started code with small static touch, but it’s start nonetheless.</Paragraph>
					<Paragraph>
					Next I’ll format my html file into something nice to look at. One step at a time.</Paragraph>
					<Paragraph>
					P.S. you may ask where’s routing through ‘*’, it’s somewhat like static files work, but also I planned to set up React in this tut, but it’s getting so much bigger than anticipated, so in other tuts to go.</Paragraph>
				</ArticleContent>
				<AssetsSidebar>Assets</AssetsSidebar>
			</Container>);
	}
}

export default App;
