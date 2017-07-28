import React, { Component } from 'react';
import { Container, MetaSidebar, AssetsSidebar, ArticleContent, Title, Header, SectionHeader, ParagraphHeader, Paragraph, CodeLine, CodeBlock, Figure, CodeSample } from './ViewKit';

const mockData = {
	content: `
[!Making page look pretty]
Some tut text
First I’ll design or wireframe how I want article to look:
[mockup.png img testing rest params="grabbyhand"]
Img caption that would sit next to url and stuuf - (My great drawings, I know)
More text
\`sparsed by code insert\`
Finished project styles:
[static-page-style.css code]
And HTML layout:
[static-index-page.html code]
\`\`\`after which goes  codeblock
with
multiple
lines
\`\`\`
	`,
	assets: {
		'mockup.png': {
			type: 'img',
			caption: 'Demo caption',
			url: '/design-mockup-full.png'
		},
		'static-page-style.css':{
			type: 'code',
			text: `sample
multiline
code
text`,
			filename: 'styles.css'
		},
		'static-index-page.html':{
			type: 'code',
			text: `<tag>sample </tag>
			multiline
			code
			text`,
			filename: 'index.html'
		},
	}
};

const Loader = () =>
	<div>Loading, wait bruh</div>;

class Article extends Component{
	constructor(p){
		super(p);
		const { content, assets } = mockData;
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
		let parsedContent;
		parsedContent = content.trim().split('\n').reduce((parsedArray, line, i) => {
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
			return parsedArray.concat(<AComp key={i}>{text}</AComp>);

		}, []); // don't forget to initialize as array beforehand
		this.state = {
			content: parsedContent.filter(cont => cont) //filter nulls that came from CodeBlock
		};
		setTimeout(() => this.setState({ contentReady: true }), 1000);
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
