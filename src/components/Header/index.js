import { Container, IconSignOut } from "./styles";
import imgLogo from "../../assets/logo.png";
import imgProfile from "../../assets/profileStandard.png";


function Header() {
    return (
        <Container>
            <div>
                <img src={imgLogo} id="logo" alt="" />
                <img src={imgProfile} alt="" />
                <p>Fulano</p>
            </div>
            <IconSignOut />
        </Container>
    )
}

export default Header;