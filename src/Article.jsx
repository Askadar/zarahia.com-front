import React, { Component } from 'react';
import { Container, MetaSidebar, AssetsSidebar, ArticleContent, Title, Header, SectionHeader, ParagraphHeader, Paragraph, CodeLine, CodeBlock } from './ViewKit';

const mockData = {
	content: `
[!Making page look pretty]
Some tut text
First I’ll design or wireframe how I want article to look:
[mockup.png img]
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
			caption: '',
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
			'img': ({ url, caption }) => <img src={url} alt={caption + 'Some random text to indicate live component'}/>,
			'code': (props) => <CodeBlock>{props.text}</CodeBlock>,
			'd': Paragraph,
			'[!': Title,
			'[*': Header,
			'[~': SectionHeader,
			'[_': ParagraphHeader
		};
		let parsedContent;
		let tempCodeBlockData = [];
		parsedContent = content.trim().split('\n').map((line, i) => {
			const token = line.slice(0,3);
			let AComp = znSyntaxComponents['d'];
			let text = line;
			if (token === '```') {
				// coding part
				if (token === '```' && tempCodeBlockData.length === 0)
					// got CodeBlock starting
					// (because temp array isn't empty)
					tempCodeBlockData.push(line.slice(3,-1));
				else if (tempCodeBlockData.length > 0)
					// we're still going through CodeBlock because array is filling up
					return <CodeBlock key={i}>{tempCodeBlockData.join('\n')}</CodeBlock>;
				else if (token === '```' && tempCodeBlockData.length > 0) {
					// got to the end of CodeBlock
					tempCodeBlockData = [];
					return null;
				}
				else if (token[1] !== '`')
					// we've found CodeLine, get contents without backtick marks
					return <CodeLine key={i}>{line.slice(1, -1)}</CodeLine>;

			}
			else if (token[0] === '['){
				if (!/[a-z]/i.test(token[1])){
					AComp = znSyntaxComponents[token.slice(0,2)];
					text = text.slice(2, -1);
				}
				//small regex check if we don't have alphabetic letter in any case at second position of token
				else
					return line.slice(1,-1).split(' ').reduce((total, part, j) => {
					//that's one kinda tricky, and for now we're hoping to get  only 2 params
						if (j === 0)
						// if we got asset id\name pass it into total
							return assets[part];
						else if (j === 1){
							// otherwise, we get type and need to invoke component from supported ones
							// AComp gets function reference, that tells React which comonent to use
							// And I expect it to be pretty obscure feature, cause you rarely need to use dynamically selected components
							const AComp = znSyntaxComponents[part];
							return <AComp {...assets[total]}  key={i}/>;
						}

					});
			}
			return <AComp key={i}>{text}</AComp>;

		});
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
