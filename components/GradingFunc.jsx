import React from 'react';


const GradingFunc = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A-';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B-';
    return 'C';
}

export default GradingFunc;