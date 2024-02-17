import '../components/css/Footer.css'
import {useNavigate} from "react-router-dom";

function Footer() {

    const navigate = useNavigate();

    return(
        <>
            <footer>
                <div className="container1 flex">
                    <div className="footer flex">
                        <div className="footerlogo">
                            <h2>FurrEverr Finds</h2>
                            <p>
                                At Furrever Finds, we believe in creating a haven for pet lovers, where every
                                product tells a story of love, joy, and companionship.Whether you're a proud
                                dog parent or a cat enthusiast, FurreverFinds is your go-to destination for
                                discovering thoughtful and quality products that enhance the unique bond between
                                pets and their owners.
                            </p>
                        </div>
                        <div className="footernav">
                            <h3>Categories</h3>
                            <ul className="flex">
                                <li><a onClick={() => {
                                    navigate("/category_dogs") }}>Dog Category(Canines)</a></li>
                                <li><a onClick={() => {
                                    navigate("/category_cats") }}>Cat Category(Felines)</a></li>
                            </ul>
                        </div>
                        <div className="furreverrlogo" style={{ backgroundImage: 'url(./furreverr_logo.png)' }}></div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Footer