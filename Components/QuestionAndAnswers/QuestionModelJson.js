import React from 'react'

class QuestionModelJson extends React.Component {
    questionModelObj = {
        QuestionId: '',
        Question: '',
        Description: '',
        UserId: '',
        UserimageURL: '',
        UserName: '',
        UserIPAddress: '',
        CreatedTime: '',
        ImageURL: [],
        Count: {
            likeCount: '',
            answerCount: '',
            followCount: '',
            unfollowCount: ''
        },
        LikeList: '',
        FollowList: '',
        UnFollowList: '',
        IsDelete: false
    };

    answerModelObj = {
        Answer: '',
        AnswerId: '',
        Count: {
            dislikeCount: 0,
            likeCount: 0,
            replyCount: 0
        },
        CreatedTime: '',
        DisLikeList: '',
        ImageURL: '',
        IsDelete: '',
        LikeList: '',
        ParentId: '',
        QuestionId: '',
        UserIPAddress: '',
        UserId: '',
        UserName: '',
        UserimageURL: '',
        IsEdit: false
    }

    answerReplyObj = {
        AnswerId: '',
        ParentId: '',
        QuestionId: '',
        UserId: '',
        UserimageURL: '',
        UserName: '',
        Comment: '',
        CommentGIF: '',
        Timestamp: '',
        UserIPAddress: '',
        Count: {
            likeCount: '',
            dislikeCount: '',
            replyCount: ''
        },
        LikeList: '',
        DisLikeList: ''
    }
}

export default QuestionModelJson;
