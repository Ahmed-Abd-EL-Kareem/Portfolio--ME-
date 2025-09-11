import { FaBootstrap, FaReact } from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io'
import { RiNextjsFill, RiNodejsLine, RiTailwindCssFill } from 'react-icons/ri'
import { SiExpress, SiMongodb } from 'react-icons/si'

const skills = [
  {
    name: 'React',
    level: 90,
    color: 'from-cyan-400 to-blue-500',
    icon: <FaReact className='text-2xl' aria-label='React logo' />,
  },
  {
    name: 'Next.js',
    level: 85,
    color: 'from-gray-700 to-gray-900',
    icon: <RiNextjsFill className='text-2xl' aria-label='Next.js logo' />,
  },
  {
    name: 'JavaScript',
    level: 95,
    color: 'from-yellow-400 to-orange-500',
    icon: (
      <IoLogoJavascript className='text-2xl' aria-label='JavaScript logo' />
    ),
  },
  {
    name: 'HTML/CSS',
    level: 98,
    color: 'from-orange-400 to-red-500',
    icon: '🌐',
  },
  {
    name: 'Node.js',
    level: 80,
    color: 'from-green-400 to-emerald-500',
    icon: <RiNodejsLine className='text-2xl' aria-label='Node.js logo' />,
  },
  {
    name: 'Express',
    level: 75,
    color: 'from-gray-500 to-gray-700',
    icon: <SiExpress className='text-2xl' aria-label='Express.js logo' />,
  },
  {
    name: 'MongoDB',
    level: 70,
    color: 'from-green-500 to-teal-500',
    icon: <SiMongodb className='text-2xl' aria-label='MongoDB logo' />,
  },
  {
    name: 'Bootstrap',
    level: 85,
    color: 'from-purple-400 to-purple-600',
    icon: <FaBootstrap className='text-2xl' aria-label='Bootstrap logo' />,
  },
  {
    name: 'Tailwind CSS',
    level: 90,
    color: 'from-cyan-400 to-blue-600',
    icon: (
      <RiTailwindCssFill className='text-2xl' aria-label='Tailwind CSS logo' />
    ),
  },
]

export default skills
