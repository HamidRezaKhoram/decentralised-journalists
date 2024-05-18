import { motion } from 'framer-motion';

export default function Hero() {
    return (

        <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white"
        >
            <h1 className="text-4xl">Welcome to My Website</h1>
            <p className="mt-4 text-lg">This is the hero section of the page.</p>
        </motion.section>
    );
};
