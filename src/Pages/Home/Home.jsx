import { motion } from "framer-motion";
import Banner from "./Banner";
import CustomerReviews from "./CustomerReviews";
import OurServices from "./OurServices";
import PopularServices from "./PopularServices";

const Home = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50},
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut"  },
    },
  };
  
  return (
    <div>
    <title>Home</title>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Banner />
        </motion.div>

 
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
        >
          <PopularServices />
        </motion.div>


        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
        >
          <CustomerReviews />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
        >
          <OurServices />
        </motion.div>
    </div>
  );
};

export default Home;
