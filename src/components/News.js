import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general",
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }
    async componentDidMount() {

        // https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=da62c543a3aa47748be17ae1dd6ace74
        // replacing &apiKey to &category=${this.props.category}&apiKey
        // and us to ${this.props.country}
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da62c543a3aa47748be17ae1dd6ace74&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ loading: false });
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })

    }
    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da62c543a3aa47748be17ae1dd6ace74&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);

        let parseData = await data.json();
        this.setState({ loading: false });
        this.setState({
            // updating the page
            page: this.state.page - 1,
            articles: parseData.articles
        })
    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.totalResults / 10))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da62c543a3aa47748be17ae1dd6ace74&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({ loading: false });
            this.setState({
                // updating the page
                page: this.state.page + 1,
                articles: parseData.articles
            })
        }
    }

    render() {
        return (
            <>
                <div className="container my-3 text-center ">
                    <h1 className="text-center">Top headlines</h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!(this.state.loading) && this.state.articles.map((e) => {

                            return <div className="col-md-4" key={e.url}>
                                <NewsItem title={e.title ? e.title.slice(0, 45) : ""} description={e.description ? e.description.slice(0, 88) : ""} imageUrl={e.urlToImage} url={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
                            </div>
                        })}
                    </div>
                    <div className="container d-flex justify-content-between my-3">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                        <button disabled={(this.state.page + 1 > Math.ceil(this.totalResults / 10))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>

                </div>
            </>
        )
    }
}