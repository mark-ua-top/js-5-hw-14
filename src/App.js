import './App.css';
import { Component } from 'react';
import ArticleList from './components/ArticleList/ArticleList';

class App extends Component {
  state = {
    articles: [],
    loading: false
  };

  timeoutId = null;

  componentDidMount() {
    this.loadArticles();
  }

  componentWillUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  loadArticles = async () => {
    this.setState({ loading: true, articles: [] });

    const articles = [];
    const usedIds = new Set();

    while (articles.length < 5) {
      const randomId = Math.floor(Math.random() * 1000) + 100;
      if (usedIds.has(randomId)) continue;
      usedIds.add(randomId);

      try {
        const res = await fetch(`https://hn.algolia.com/api/v1/items/${randomId}`);
        const article = await res.json();

        if (article && article.title && article.url && article.author) {
          articles.push(article);
        }
      } catch (e) { }
    }

    this.setState({ articles });

    this.timeoutId = setTimeout(() => {
      this.setState({ loading: false });
      this.timeoutId = null;
    }, 1000);
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <div className="App">
        <h1>Hacker News Articles</h1>
        {loading && <p>Loading...</p>}
        {articles.length > 0 && <ArticleList articles={articles} />}
      </div>
    );
  }
}

export default App;
