import Image from "next/image";
import styled from "styled-components";

import logoCat from "../../../../../../assets/logo_cat.svg";
import logoWordmark from "../../../../../../assets/logo_wordmark.svg";

const LogoWrapper = styled.a`
  display: flex;
  gap: 0px 7px ;
  align-items: center;
  width: 100%;
`
const GenkiLogo = () => {
  return (
    <div>
        <LogoWrapper
          href="https://genki.io/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={logoCat}
            width={22}
            height={26}
            alt="Genki Logo"
          />
          <Image
            src={logoWordmark}
            width={60}
            height={18}
            alt="Genki Text"
          />
        </LogoWrapper>
      </div>
  )
}

export default GenkiLogo;