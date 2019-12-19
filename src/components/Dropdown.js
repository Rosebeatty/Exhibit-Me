import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { withAuth } from "../lib/AuthProvider";

const friendOptions = [
 
  {
    key: 'Matt',
   
    value: 'Matt',
    image: { avatar: true, src: '/bali.jpg', width: "20%"},
  },
  {
    key: 'Justen Kitsune',
   
    value: 'Justen Kitsune',
    image: { avatar: true, src: '/eq.jpg', width: "20%"},
  },
]

const DropdownMenu = () => (
  <Dropdown
    placeholder='Select Friend'
    fluid
    selection
    options={friendOptions}
  />
)

export default withAuth(DropdownMenu)