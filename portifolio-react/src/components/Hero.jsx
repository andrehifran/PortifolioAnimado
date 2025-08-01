import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-6xl font-bold"
      >
        Olá, eu sou <span className="text-cyan-400">Andre Hifran</span>
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-xl sm:text-2xl mt-4 text-cyan-400"
      >
        <Typewriter
          words={["Desenvolvedor Full Stack", "Freelancer", "Apaixonado por Código"]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </motion.h2>
    </section>
  );
};

export default Hero;
