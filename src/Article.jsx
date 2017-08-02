import React, { Component } from 'react';
import { Container, MetaSidebar, AssetsSidebar, ArticleContent, Title, Header, SectionHeader, ParagraphHeader, Paragraph, CodeLine, CodeBlock, Figure, CodeSample } from './ViewKit';
import axios from 'axios';

// TODO refactor it out
const znSyntaxComponents = {
	// for image create anonymous component
	'img': Figure,
	'code': CodeSample,
	'd': Paragraph,
	'[!': Title,
	'[*': Header,
	'[~': SectionHeader,
	'[_': ParagraphHeader,
	'`': CodeLine,
	'```': CodeBlock
};
const znParserReducer = (parsedArray, line, i, arr)  => {
	const { assets } = parsedArray[0];
	const token = line.slice(0,3);
	let AComp = znSyntaxComponents['d'];
	let text = line;
	let prevLine = parsedArray.slice(-1)[0]; // small slice hack to get last element from array
	if (token === '```' || Array.isArray(prevLine) ) {
		// we're looking through CodeBlock
		if (!Array.isArray(prevLine))
		// starting to build our code block
			return parsedArray.concat([[line.slice(3,-1)]]); //double brackets cause concat accepts array and destructure it by default
		else if (token !== '```' && prevLine.length > 0) {
		// appending lines to it
			parsedArray.splice(-1, 1, prevLine.concat(line));
			return parsedArray;
		}
		else if (token === '```' && prevLine.length > 0){
		// encountered closing token, should clean temp array and set up Arbitraty component with text insert
			AComp = znSyntaxComponents['```'];
			text = prevLine.join('\n');
			parsedArray.splice(-1, 1);
		}
	}
	// finished dealing with CodeBlock
	else if (token[0] === '`'){
	// got simple CodeLine
		AComp = znSyntaxComponents[token[0]];
		text = text.slice(1,-1);
	}
	else if (token[0] === '['){
	// got either shortcode or header
		if (!/[a-z]/i.test(token[1])) {
			// small regex check that we don't have alphabetic letters in any cAse at second position of token
			AComp = znSyntaxComponents[token.slice(0,2)];
			text = text.slice(2, -1);
		}
		else {
		// got ourselves shortcode
			const [id, type, ...rest] = line.slice(1,-1).split(' ');
			// grab id and type, also grab all other params and for now directly pass them into specified component
			AComp = znSyntaxComponents[type];
			return parsedArray.concat(<AComp {...assets[id]} {...rest} key={'shortcode-' + i}/>);
		}
	}
	arr.length === i + 1 && parsedArray.shift();
	return parsedArray.concat(<AComp key={i}>{text}</AComp>);

};
const Loader = () =>
	<div>Loading, wait bruh</div>;

class Article extends Component{
	constructor(p){
		super(p);
		axios.get('/api/articles/597ee59699b0c312ec868ebf')
			.then(resp => this.contentLoaded(resp.data))
			.catch(err => console.warn(err) || this.contentFailedToLoad(err));
		this.state = {
			contentReady: false
		};
	}
	contentLoaded({ content, assets }) {
		// TODO refactor it out
		const parsedContent = content.trim().split('\n').reduce(znParserReducer, [{ assets }]); // don't forget to initialize as array beforehand
		this.setState({
			content: parsedContent,
			contentReady: true
		});
	}
	contentFailedToLoad(err){
		this.setState({
			content: err.message,
			contentReady: true
		});
	}
	render(){
		const { content, contentReady } = this.state;
		return(
			<Container className="container">
				<MetaSidebar>Meta tags</MetaSidebar>

				{
					contentReady ?
						<ArticleContent>
							{content}
						</ArticleContent> :
						<Loader/>

				}

				<AssetsSidebar>Assets</AssetsSidebar>
			</Container>);
	}
}

export default Article;
