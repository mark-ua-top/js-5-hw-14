import { Component } from "react";

class ArticleList extends Component {
    render() {
        const { articles } = this.props;

        return (
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <span> — {article.author}</span>
                        <span> ({article.points ?? 0} points)</span>
                    </li>
                ))}
            </ul>
        );
    }
}

export default ArticleList;
