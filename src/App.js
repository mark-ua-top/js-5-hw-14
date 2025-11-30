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

    const ids = [];
    while (ids.length < 20) {
      const randomId = Math.floor(Math.random() * 1000) + 100;
      if (!ids.includes(randomId)) ids.push(randomId);
    }

    for (let id of ids) {
      const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
      const article = await res.json();
      this.setState((prevState) => ({
        articles: [...prevState.articles, article]
      }));
    }

    this.timeoutId = setTimeout(() => {
      this.setState({ loading: false });
      this.timeoutId = null;
    }, 2000);
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
