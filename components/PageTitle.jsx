import React from 'react'

const PageTitle = ({title, subtitle}) => {
  return (
      <div className='mb-2'>
        {title ? (<h1 className="text-3xl font-bold text-gray-900">{title}</h1>): ''}
        {subtitle ? (<p className="text-gray-600">{subtitle}</p>):''}
      </div>
  )
}

export default PageTitle
