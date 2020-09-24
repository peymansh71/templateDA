import React from 'react'
import SimpleBar from 'simplebar-react'

import SidebarContent from './SidebarContent'

const Sidebar = ({type}) => {
  return (
    <>
      <div className='vertical-menu'>
        <div data-simplebar className='h-100'>
          {type !== 'condensed' ? (
            <SimpleBar style={{maxHeight: '100%'}}>
              <SidebarContent />
            </SimpleBar>
          ) : (
            <SidebarContent />
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
