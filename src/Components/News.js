import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  // to capitalise the title
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)}- MyNewsApp`;
  }

  async updateNews() {
    this.props.setProgress(5);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&Page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching news data:", error);
    }
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&Page=${this.state.page}&pageSize=${this.props.pageSize}`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.log("Error fetching news data:", error);
    }
  };

  // handleNextclick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };
  // handlePrevclick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  render() {
    return (
      <>
        <h1 className="text-center mt-5">
          MyNewApp - Top {this.capitalize(this.props.category)} headlines.
        </h1>
        {this.state.loading && <Spinner />}

        <hr />
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading &&     (this will used when we use spinner) */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            type="submit"
            onClick={this.handlePrevclick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-primary"
            type="submit"
            onClick={this.handleNextclick}
          >
            Next&rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
