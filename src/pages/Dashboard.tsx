import './css/Dashboard.css'
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import {BsArrowRightCircleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    return (
        <>
            <Header />

            <main>
                <section className="dashboardheader">
                    <div className="container4">
                        <div className="dashboardheaderinfo flex">
                            <h2 className="dashboardheadertitle">Paws and Play: Furrever Finds the Way!</h2>
                            <p className="dashboardheaderpera">Discover Timeless Treasures for Your Furry Friends
                                at FurreverFinds – Cuz Every Pet Deserves a Tailored Touch of Love and Care!</p>
                        </div>
                    </div>
                </section>

                {/*featured items or explore*/}
                <div className="featureditem container4 flex">
                    <div className="featuredtitles flex">
                        <div className="titleicon">
                            <img src="paw_ico.png" alt="paw_ico"/>
                        </div>
                        <h2>EXPLORE</h2>
                        <p>Indulge your pets with our featured delights – discover the perfect treats and
                            accessories for your furry companions:</p>
                    </div>
                </div>

                <section className="dashboardheader2 flex">
                    <div className="container5 flex">
                        <div className="dashboardheaderinfo2 flex">
                            <p className="dashboardheaderpera"></p>
                            <i><BsArrowRightCircleFill onClick={() => {
                                navigate("/category_dogs") }}/></i>
                        </div>

                        <div className="dashboardheaderinfo3 flex">
                            <p className="dashboardheaderpera"></p>
                            <i><BsArrowRightCircleFill onClick={() => {
                                navigate("/category_cats") }}/></i>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}

export default Dashboard;