'use client'
import React, { useEffect, useState } from 'react'
import SingleLP from '@/components/lp/SingleLP';

const AllLp = ({blogs}) => {
   
    return (
        <div>
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flex: 'col' }}>
                {blogs && blogs.map((blog, index) => (
                    <SingleLP key={index} blog={blog} />
                ))}
            </div>
        </div>
    )
}

export default AllLp