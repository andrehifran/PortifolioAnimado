import { motion } from 'framer-motion';

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-4">Olá, eu sou André!</h1>
        <p className="text-xl">Desenvolvedor Frontend | React.js | Tailwind</p>
      </motion.div>
    </div>
  );
}
