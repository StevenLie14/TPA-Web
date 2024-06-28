import myImage from '../assets/pxfuel.jpg'

export const Card = () => {
    return(
        <div className={"cardContainer"}>
            <h2>Focus</h2>
            <div className={"cardWrapper"}>
                <div className={"card"}>
                    <div className={"cardImage"}>
                        <img src={myImage} alt={"placeholder"}/>
                        <span className={"play"}>
                            <svg height="16" role="img" width="16" viewBox="0 0 24 24">
                                <polygon points="21.57 12 5.98 3 5.98 21 21.57 12"/>
                            </svg>
                        </span>
                    </div>
                    <div className={"cardContent"}>
                        <h3>Title</h3>
                        <p>Content</p>
                    </div>
                </div>

                <div className={"card"}>
                    <div className={"cardImage"}>
                        <img src={myImage} alt={"placeholder"}/>
                        <span className={"play"}>
                            <svg height="16" role="img" width="16" viewBox="0 0 24 24">
                                <polygon points="21.57 12 5.98 3 5.98 21 21.57 12"/>
                            </svg>
                        </span>
                    </div>
                    <div className={"cardContent"}>
                        <h3>Title</h3>
                        <p>Content</p>
                    </div>
                </div>
            </div>
        </div>
    )
}