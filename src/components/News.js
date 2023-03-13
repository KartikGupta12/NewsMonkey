import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string, 
    }
    constructor() {
        super();
        this.state = {
            articles:[],
            loading: false,
            page:1,
            totalarticles:0
        }
    }
    async componentDidMount(){
        console.log("hello");
        this.setState({loading:true});
        let urrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c401becdfc3846959cbffcd8f0eb369e&page=${this.state.page}&pageSize=20`;
        let data=await fetch(urrl);
        let parsedata=await data.json();
        this.setState({articles:parsedata.articles,totalarticles:parsedata.totalResults,loading:false})
    }
    onclicknext= async ()=>{
        this.setState({loading:true});
        let urrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c401becdfc3846959cbffcd8f0eb369e&page=${this.state.page+1}&pageSize=20`;
        let data=await fetch(urrl);
        let parsedata=await data.json();
        this.setState({page:this.state.page+1});
        this.setState({articles:parsedata.articles,loading:false})
    }
    onclickpre= async ()=>{
        
        this.setState({loading:true});  
        let urrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c401becdfc3846959cbffcd8f0eb369e&page=${this.state.page-1}&pageSize=20`;
        let data=await fetch(urrl);
        let parsedata=await data.json();
        this.setState({page:this.state.page-1});
        this.setState({articles:parsedata.articles,loading:false})
    }
    render() {
       
        return (
            <div className="container my-3">
                <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
                {this.state.loading&&<Spinner/>}
                <div className="row my-4">

                    {!this.state.loading&&this.state.articles.map((element) => {
                        return (<div className="col-md-4" key={element.url}>
                            <Newsitem  title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} source={element.source.name}/>
                        </div>)
                    })}
                </div>
                <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-dark" disabled={this.state.page==1} onClick={this.onclickpre}>Previous</button>
                <button type="button" className="btn btn-dark" onClick={()=>{
                    window.scrollTo({top:0,behavior:'smooth'});
                }}>top of page</button>
                <button type="button" className="btn btn-dark" disabled={this.state.page+1>Math.ceil(this.state.totalarticles/20)} onClick={this.onclicknext}>Next</button>
                
                </div>
            </div>

        )
    }
}

export default News