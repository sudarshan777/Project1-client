import React, { Component } from "react";
import { connect } from "react-redux";

import ArticlesList from "./articles-list";
import { getArticlesList } from "../redux/actions/get-list";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getArticlesList());
  }
  render() {
    return (
      <div>
        <ArticlesList articles={this.props.articles} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    articles: state.articleListReducer.articles,
  };
}

export default connect(mapStateToProps)(Home);
