
export const SideUser = ({user} : {user : User}) => {
    return (
        <div className="sideUser">
            <img src={user.avatar} alt={""}/>
            <div className={"sidePlaylistContent"}>
                <h3>{user.username}</h3>
                <p>{user.role}</p>
            </div>
        </div>
    )
}