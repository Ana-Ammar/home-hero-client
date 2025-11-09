import Banner from './Banner';
import CustomerReviews from './CustomerReviews';
import OurServices from './OurServices';
import PopularServices from './PopularServices';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularServices />
            <div className='divider'></div>
            <CustomerReviews />
            <div className='divider'></div>
            <OurServices />
        </div>
    );
};

export default Home;