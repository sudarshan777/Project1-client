import * as Type from '../actions/types'

const initialUserProfile = {
    profile : []
}


const handleEditUser = (state, action) => {
    const result = JSON.parse(JSON.stringify(action.result))
}



export default (state = initialUserProfile, action={}) => {
    switch(action.type) {
        case Type.USER_PROFILE_EDIT:
            return {
                ...state, userProfile:  action.userProfile
            };
        
        case Type.USER_PROFILE_EDIT_SERVER_RESPONSE_SUCCESS:
            return handleEditUser(state, action)

        case Type.USER_PROFILE_EDIT_SERVER_RESPONSE_ERROR:
            return {
                ...state
            }

        default: return {
            ...state
        }
    }
}