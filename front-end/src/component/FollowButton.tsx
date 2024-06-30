import {useAuth} from "../context/UseAuth.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

export const FollowButton = ({userFollow} : {userFollow : User}) => {
    const {user} = useAuth();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if(user){
            axios.get("http://localhost:4000/get-following?id="+user.user_id).then((res: AxiosResponse<WebResponse<Follow[]>>) => {
                if (res.data.data.find((follow) => follow.FollowingId === userFollow.user_id)){
                    setIsFollowing(true);
                }
            }).catch((err) => {
                console.log(err)
            })
        }



    }, [user])
    const handleFollow = async () => {
        console.log(userFollow.user_id)
        console.log(user?.user_id)
        if(user){
            if (isFollowing) {
                axios.delete("http://localhost:4000/follow", {
                    data: {
                        followId: userFollow.user_id,
                        followerId: user.user_id
                    }
                }).then((res) => {
                    console.log(res);
                    setIsFollowing(false);
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                axios.put("http://localhost:4000/follow", {
                    followId:userFollow.user_id,
                    followerId: user.user_id
                }).then((res) => {
                    console.log(res);
                    setIsFollowing(true);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }
    return(
        <button className={"follow"} onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</button>
    )
}