import React from 'react'

const TruncateText = ({text, maxLength}) => {
    if (text.length <= maxLength) return text
    else return text.slice(0, maxLength) + '...';
}

export default TruncateText
