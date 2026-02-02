'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-md w-full text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative w-full h-64 rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/food.jpg"
            alt="Delicious food"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Добро пожаловать 👋
          </h1>
          <p className="text-gray-500">
            Открой для себя лучшие рецепты со всего мира
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const token = localStorage.getItem('access')

            if (token) {
              router.push('/home')
            } else {
              router.push('/guest')
            }
          }}
          className="cursor-pointer w-full rounded-full bg-orange-500 py-3 text-white font-semibold shadow-lg hover:bg-orange-600 transition"
        >
          Продолжить →
        </motion.button>

      </motion.div>
    </div>
  )
}
