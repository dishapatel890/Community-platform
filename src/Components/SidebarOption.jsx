import React from 'react';
import styled from 'styled-components';

const SidebarOption = ({Image, title}) => {
  // Styled Components
  const SidebarCommunity_Icon = styled.div`
    display: flex;
    font-size: 20px;
    cursor: pointer;
    &:hover{
      background-color: var(--primaryDarkColor);
    }
  `;

  const communityIcon = {
    fontSize: '20px',
    marginRight: '5px'
  };

  // Prints the image and name of community passed in arguments on first page
  return (
    <SidebarCommunity_Icon>
        {Image && <Image style={communityIcon}/>}
        {Image ? (<p> {title}</p>) : (<p> # {title} </p>)}
    </SidebarCommunity_Icon>
  )
}

export default SidebarOption