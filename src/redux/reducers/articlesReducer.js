import * as Type from "../actions/types";

const initialUserObj = {

    "result": []
};

const handleArticleList = (state, action) => {
    console.log("ListProject" + JSON.stringify(action));
    let newState = { ...state };
    if (action.result !== undefined) {
        newState = Object.assign({}, state, { "result": action.result })
    }
    return { ...newState };

}

const handleCreateArticle = (state, action) => {
    console.log("CreateArticle" + JSON.stringify(action.result));
    let newState = { ...state };
    if (action.result !== undefined) {
        newState = Object.assign({}, state, action.result)
    }
    return { ...newState };

}
export default (state = initialUserObj, action = {}) => {
    switch (action.type) {

        case Type.CREATE_ARTICLE:
            return { ...state, articleDetails: action.articleDetails }

        case Type.CREATE_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS:
            return handleCreateArticle(state, action);

        case Type.CREATE_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR:
            return { ...state }

        // case Type.UPDATE_ARTICLE_SUCCESS:
        //     return handleArticleList(state, action);

        case Type.DELETE_ARTICLE_SUCCESS:
            const newState = state.result.filter(eachArticle => eachArticle._id !== action._id); // Use filter method to remoreove the item that has been deleted from the st
            console.log("DELETE" + JSON.stringify(state.result));
            console.log("REducer DELETE" + JSON.stringify(action._id));
            console.log("sds" + newState)
            return { newState }

        default:
            return { ...state };
    }
};