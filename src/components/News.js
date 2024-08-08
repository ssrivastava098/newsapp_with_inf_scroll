import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  static defaultProps = {
    country: "in",
    itemsPerPage: 8,
    // category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    itemsPerPage: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstChar = (word) => {
    const new_word = word.charAt(0).toUpperCase() + word.slice(1);
    return new_word;
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      totalResults: 0,
      page: 1,
      loading: true
    }
  }
  async componentDidMount() {
    this.setState({loading:true})
    this.props.setProgress("10");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.itemsPerPage}`;
    this.props.setProgress("30");
    let data = await fetch(url);
    let parsed_data = await data.json();
    this.props.setProgress("50");
    this.setState({loading:false})
    this.props.setProgress("80");
    this.setState({
      articles: parsed_data.articles,
      totalResults: parsed_data.totalResults,

    });
    this.props.setProgress("100");
    document.title = `${this.capitalizeFirstChar(this.props.category)} - News Monkey`
    // this.props.setProgress("0");
  }
  async componentDidUpdate(prevProps) {
    // Check if the category has changed
    if (this.props.category !== prevProps.category) {
      this.setState({loading:true})
      this.props.setProgress("10");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.itemsPerPage}`;
      let data = await fetch(url);
      this.props.setProgress("30");
      let parsed_data = await data.json();
      this.setState({loading:false})
      this.props.setProgress("50");
      this.setState({
        articles: parsed_data.articles,
        totalResults: parsed_data.totalResults,
        page: 1
      });
      this.props.setProgress("80");
      document.title = `${this.capitalizeFirstChar(this.props.category)} - News Monkey`
      this.props.setProgress("100");
    }
  }
  formatDate(dateString) {
    const dateObj = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC' // Ensure the timezone is set correctly if necessary
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
    return formattedDate;
  }
  fetchMoreData = async () => {
    this.setState({loading:true})
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.itemsPerPage}`;
    this.props.setProgress("30");
    let data = await fetch(url);
    let parsed_data = await data.json();
    this.setState({loading:false})
    this.props.setProgress("50");
    this.setState({
      articles: this.state.articles.concat(parsed_data.articles),
      totalArticles: parsed_data.totalResults,
      page: this.state.page + 1
    });
    this.props.setProgress("80");
    document.title = `${this.capitalizeFirstChar(this.props.category)} - News Monkey`
    this.props.setProgress("100");
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center'> "NewsMonkey - Top {this.capitalizeFirstChar(this.props.category)} Headlines"</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} publishedDate={element.publishedAt ? this.formatDate(element.publishedAt) : "//Not Available"} sourceName={element.source.name ? element.source.name : "NA"} />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
