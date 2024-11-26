"use client"
import React, { Fragment } from 'react'
import { OrganizationProfile } from '@clerk/nextjs'
const SettingPage = () => {
  return (
    <Fragment>
        <div className='w-full '>
           <OrganizationProfile
            
             appearance={{
                elements:{
                    rootBox:{
                        boxShadow:"none",
                        width:"100%"
                    },
                    card:{
                        border:"1px solid #e5e5e5",
                        boxShadow:"none",
                        width:"100%"
                    }
                }
             }}
           />
        </div>
    </Fragment>
  )
}

export default SettingPage