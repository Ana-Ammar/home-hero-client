import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import Banner from './Banner';
import CustomerReviews from './CustomerReviews';
import OurServices from './OurServices';
import PopularServices from './PopularServices';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularServices />
            <CustomerReviews />
            <OurServices />
        </div>
    );
};

export default Home;