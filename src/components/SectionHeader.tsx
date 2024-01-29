import { SectionHeaderProps } from "../types"

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, heading, paragraph }) => {
  return (
    <div className='max-w-5xl mx-auto text-center space-y-3'>
      <span className="rounded-3xl bg-green-100 text-gray-800 text-sm font-medium uppercase max-w-fit px-5 py-2">
          {title}
      </span>
      <h2 className='text-4xl xl:text-5xl font-bold leading-snug xl:leading-snug'>{heading}</h2>
      <p>{paragraph}</p>
    </div>
  )
}

export default SectionHeader