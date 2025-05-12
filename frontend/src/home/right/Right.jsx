import React from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Type from './Type'

export default function Right() {
  return (
    <div className='w-[70%]  bg-slate-950 text-white' >
    
    <Chatuser />
  <div className='py-2 overflow-y-auto  ' style={{maxHeight:"calc(88vh - 12vh"}} >
  <Messages></Messages>
  </div>
    <Type />
    </div>
  )
}
