import React from 'react';
import styled from 'styled-components';


export const ArticleContent = styled.article`
	grid-area: article;=
	overflow: auto;
`;
export const Sidebar = styled.aside`=
	background: rgba(128,128,128,0.02);
`;
export const MetaSidebar = Sidebar.extend`
	grid-area: meta;
	box-shadow: rgba(128, 128, 128, 0.5) 1px 0px 1px -1px;
`;
export const AssetsSidebar = Sidebar.extend`
	grid-area: assets;
	box-shadow: rgba(128, 128, 128, 0.5) -1px 0px 1px -1px;
`;
export const Container = styled.section`
	margin: 16px auto;
	box-shadow: rgba(128, 128, 128, 0.5) 0px 0px 4px 1px;
	background: white;
	border-radius: 2px;
`;

const FullWidthPadd = styled.div`
	padding: 0 2rem;
`;
export const Title = FullWidthPadd.withComponent('h1').extend`
	font-size: 2em;
`;
export const Header = FullWidthPadd.withComponent('h2').extend`
	font-size: 1.4em;
`;
export const SectionHeader = FullWidthPadd.withComponent('h3').extend`
	font-size: 1.2em;
`;
export const ParagraphHeader = FullWidthPadd.withComponent('h4').extend`
	font-size: 1.2em;
`;
export const Paragraph = FullWidthPadd.withComponent('p').extend`
	font-size: 1em;
`;
export const Figure = ({ url, caption }) => <img style={{ padding: 27 }} src={url} alt={caption + ' with some random text to indicate live component'}/>;
export const CodeLine = FullWidthPadd.withComponent('code').extend`
	font-size: 1em;
	display: block;
`;
export const CodeLines = CodeLine.extend`
	padding: 0;
	width: 100%;
	overflow: auto;
`;
export const CodeInsert = FullWidthPadd.withComponent('code').extend`
	font-size: 1em;
	display: inline-block;
`;

const CodeBlockUnstyled = ({ children, className }) =>
	<pre className={className}>
		<CodeLines>{children}</CodeLines>
	</pre>;

export const CodeBlock = FullWidthPadd.withComponent(CodeBlockUnstyled).extend`
	font-size: 1em;
	display: block;
`;
export const CodeSample = ({ text }) => <CodeBlock>{text}</CodeBlock>;
// TODO replace with proper BigCodeSample component
export const List = styled.ul`
	padding: 0px;
`;
