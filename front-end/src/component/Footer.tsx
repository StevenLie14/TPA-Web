import {Instagram, Linkedin, Twitter,} from "lucide-react";

export const Footer = () => {

    return(
        <footer>
            <div className={"up"}>
                <div className={"left"}>
                    <img src={"/assets/NJOTIFY.png"} alt={""}/>
                    <div className={"footerContent"}>
                        <p className={"footerTitle"}>COMPANY</p>
                        <p>About</p>
                        <p>Work</p>
                        <p>For the Record</p>
                    </div>
                    <div className={"footerContent"}>
                        <p className={"footerTitle"}>COMMUNITY</p>
                        <p>For Artist</p>
                        <p>Developer</p>
                        <p>Advertisement</p>
                        <p>Investor</p>
                        <p>Vendor</p>
                    </div>

                    <div className={"footerContent"}>
                        <p className={"footerTitle"}>NJOTIFY PACKAGE</p>
                        <p>Premium</p>
                        <p>Individual</p>
                        <p>Premium Duo</p>
                        <p>Premium Student</p>
                    </div>
                </div>
                <div className={"right"}>
                    <div>
                        <Twitter/>
                    </div>
                    <div>
                        <Instagram/>
                    </div>
                    <div>
                        <Linkedin/>
                    </div>
                </div>
            </div>
            <div className={"down"}>
                <div className={"left"}>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
                <div className={"right"}>
                    <p>© 2024 NJ NOTIFY</p>
                </div>
            </div>
        </footer>
    )
}