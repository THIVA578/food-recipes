import { Popular } from "../components/Popular";
import { Veggie } from "../components/Veggie";
import { motion } from "framer-motion";

let Home = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Popular />
      <Veggie />
    </motion.div>
  );
};

export default Home;
