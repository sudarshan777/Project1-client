import React, { Component } from "react";
import { connect } from "react-redux";

import ArticlesList from "./articles-list";

class Home extends Component {
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