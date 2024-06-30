
export const ProfileCard = ({user} : {user : User}) => {
    return(
        <div className={"card"}>
            <div className={"cardImage"}>
                <img src={user.avatar} alt={"placeholder"} className={"profilePic"}/>
            </div>
            <div className={"cardContent"}>
                <h3>{user.username}</h3>
                <p>Profile</p>
            </div>
        </div>
    )
}