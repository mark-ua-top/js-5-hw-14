import { Component } from "react";

class ArticleList extends Component {
    render() {
        const articles = this.props.articles;

        return (
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <a href={article.url}>
                            {article.title}
                        </a>{article.author} ({article.points} points)
                    </li>
                ))}
            </ul>
        );
    }
}

export default ArticleList;
