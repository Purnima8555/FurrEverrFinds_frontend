import React from 'react';
import './css/Category.css';
import ItemCard from '../components/ItemCard.tsx';
import { useQuery } from 'react-query';
import axios from 'axios';
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Slider from "../components/Slider.tsx";

interface Item {
    id: number;
    itemPhoto: string;
    itemTitle: string;
    itemPrice: string;
    categoryType: string;
    subcategoryType: string;
}

const Category_snacks: React.FC = () => {
    const { data: dogsCate } = useQuery({
        queryKey: ["DOGS_CATE"],
        queryFn: () => {
            return axios.get("http://localhost:8080/content/byCategory/Dogs")
        }
    });

    // Mapping data from the table structure to itemcard structure
    const items: Item[] = dogsCate?.data?.map((item: any) => ({
        id: item.id,
        itemPhoto: item.itemPhoto,
        itemTitle: item.itemTitle,
        itemPrice: item.itemPrice,
        categoryType: item.categoryType,
        subcategoryType: item.subcategoryType, // New field
    })) || [];

    // Divide recipes into 4 sections based on subcategoryType
    const foodsAndTreats = items.filter(items => items.subcategoryType === 'food&treats');
    const toysAndAccessories = items.filter(items => items.subcategoryType === 'toys&accessories');
    const clothing = items.filter(items => items.subcategoryType === 'clothing');
    const groomingAndHygiene = items.filter(items => items.subcategoryType === 'grooming&hygiene');

    return (
        <>
            <Header />

            <main>

                <Slider/>

                {/*featured recipes*/}
                <div className="featuredrecipe container10 flex">
                    <div className="featuredtitles flex">
                        <div className="titleicon">
                            <img src="dog_icon.png" alt=" " />
                        </div>
                        <h2>Items For Doggos</h2>
                        <p> Indulge your furry friend in a world of joy with our curated selection of
                            delightful surprises. Pamper your pup, because every tail deserves a wag!</p>
                    </div>
                </div>

                {/* Section 1: Foods&Treats */}
                <div className="quickrecipe-title flex">
                    <h2>Foods and Treats Section:</h2>
                </div>
                <div className={'main-cards'}>
                    <section className="threecards container10 flex">
                        {foodsAndTreats.map((items) => (
                            <ItemCard key={items.id} item={items} />
                        ))}
                    </section>
                </div>

                {/* Section 2: Toys&Accessories */}
                <div className="quickrecipe-title flex">
                    <h2>Toys and Accessories Section:</h2>
                </div>
                <div className={'main-cards'}>
                    <section className="threecards container10 flex">
                        {toysAndAccessories.map((items) => (
                            <ItemCard key={items.id} item={items} />
                        ))}
                    </section>
                </div>

                {/* Section 3: Clothing */}
                <div className="quickrecipe-title flex">
                    <h2>Clothing Section:</h2>
                </div>
                <div className={'main-cards'}>
                    <section className="threecards container10 flex">
                        {clothing.map((items) => (
                            <ItemCard key={items.id} item={items} />
                        ))}
                    </section>
                </div>

                {/* Section 4: Grooming&Hygiene */}
                <div className="quickrecipe-title flex">
                    <h2>Grooming and Hygiene Section:</h2>
                </div>
                <div className={'main-cards'}>
                    <section className="threecards container10 flex">
                        {groomingAndHygiene.map((items) => (
                            <ItemCard key={items.id} item={items} />
                        ))}
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Category_snacks;
