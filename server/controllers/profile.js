const { User, Review } = require('../models')

exports.myUserData = async(req, res) => {
    const userId = req.user.id;
    
    try{
        const user = await User.findOne({ where: { id: userId }})
        if(!user){
            return res.status(404).json({message: '사용자를 찾을 수 없습니다.'})
        }
        return res.status(200).json({
            success: true,
            message: '사용자 정보',
            user: {
                uId: user.uId,
                uEmail: user.uEmail,
                uName: user.uName,
                uNumber: user.uNumber,
                uBirth: user.uBirth,
                uSex: user.uSex,
                provider: user.provider,
                snsId: user.snsId,
                uType: user.uType,
                uLevel: user.uLevel,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        })
    }catch(error) {
        console.error(error);
        return res.status(500).json({
            error: '프로필 오류',
            details: error.message,
        });
    }
}

exports.myReviewData = async(req, res) => {
    const userId = req.user.id;

    try{
        const user = await User.findOne({ where: { id: userId }})
        if(!user){
            return res.status(404).json({message: '사용자를 찾을 수 없습니다.'})
        }
        const myReview = await Review.fineAll({ where: { id}})
    }catch(error) {
        console.error(error);
        return res.status(500).json({
            error: '내 리뷰 확인 오류',
            details: error.message,
        })
    }
}