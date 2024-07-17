
import React, { useEffect, useState } from 'react'
import NewsItem from "./NewsItem.js"
import Spinner from "./Spinner.js"
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const Capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const [whatever, setWhatever] = useState({
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0,
    })

    const update = async (a) => {
        document.title = `${Capitalize(props.category)} - NewsMonkey`
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${whatever.page + a}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        setWhatever({
            articles: parsedData.articles,
            loading: false,
            page: whatever.page + a,
            totalResults: parsedData.totalResults,
        })
    }

    useEffect(() => {
        update(0)
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${whatever.page + 1}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        setWhatever({
            articles: whatever.articles.concat(parsedData.articles),
            loading: false,
            page: whatever.page + 1,
            totalResults: parsedData.totalResults,
        })
    }
    return (
        <div className="container my-3">
            <h1 className='text-center' style={{ marginTop: "84px", marginBottom: "24px" }}>NewsMonkey - Top {Capitalize(props.category)} Headlines  </h1>
            {whatever.loading && <Spinner/>}
            <InfiniteScroll
                dataLength={whatever.articles.length}
                next={fetchMoreData}
                hasMore={whatever.articles.length !== whatever.totalResults}
                loader={<Spinner />}
                style={{ overflowX: "hidden" }}
            >
                <div className="row">
                    {whatever.articles.map((element) => {
                        return (
                            <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        )
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )
}
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News

