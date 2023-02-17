import { FC, forwardRef, memo, ReactNode, useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Button, CloseIcon, IconButton, TrophyGoldIcon, Heading } from '@pancakeswap/uikit'
import { CSSTransition } from 'react-transition-group'

import Modal from "styled-react-modal";
import Carousel, { ReactElasticCarouselProps } from "react-elastic-carousel";
import useAuth from 'hooks/useAuth'
import ConnectWalletButton from 'components/ConnectWalletButton';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
const CustomCarousel = forwardRef<any, ReactElasticCarouselProps & { children: ReactNode[], style: {} }>((props, ref) => <Carousel ref={ref} {...props} />);

/**
 * @see https://github.com/animate-css/animate.css/tree/main/source
 */
const bounceInKeyframe = keyframes`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0) scaleY(5);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, 10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const bounceOutKeyframe = keyframes`
  20% {
    transform: translate3d(0, 10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0) scaleY(3);
  }
`

const bounceInAnimation = css`
  animation: ${bounceInKeyframe} 1s;
`

const bounceOutAnimation = css`
  animation: ${bounceOutKeyframe} 1s;
`

const Wrapper = Modal.styled`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 30px;
  background-color: white;
  border-radius: 10px;
  opacity: ${(props) => props.opacity};
  z-index: 50;
  transition : all 0.3s ease-in-out;
  position: relative;

  &.popup-enter-active {
    ${bounceInAnimation}
  }

  &.popup-enter-done {
    bottom: 72px;
  }

  &.popup-exit-done {
    bottom: -2000px;
  }

  &.popup-exit-active {
    ${bounceOutAnimation}
  }
`
const PopupButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 0;
`
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 16px;
`

const Popup = styled.div`
  padding: 8px;
  width: 300px;
  align-items: end;
  color: #ffffff;
  display: flex;
  gap: 10px 0px;
  flex-direction: column;
  flex: 1 0 100%;
  height: 100%;
  overflow: hidden;
`

const Title = styled(Heading)`
  width: 100%;
  text-align: center;
  padding: 10px 0px;
  color: #1dc7d3;
  font-size: 32px;
  display: flex;
  align-items: center;
  position: relative;
`
const Description = styled.div`
  width: 100% - 72px;
  height: 10px;
  position: absolute;
  bottom: 10px;
  left: 72px;
  font-size: 16px;
  color: #b0afaf;
  text-align: start;
`
type QuestState = {
  id: string,
  state: any,
}; 
type Quest = {
  questId: string,
  title: string,
  link: string,
  description: string,
} 
const Quests = [
  {
    questId: "3O7CQR",
    title: "Swaps Token",
    description: "Swap any tokens on PancakeSwap",
    link: "https://pancakeswap.finance/swap",
  },
  {
    questId: "HC7R7J",
    title: "Add Liquidity",
    description: "Add liquidity of any token pairs on PancakeSwap",
    link: "https://pancakeswap.finance/liquidity",
  }
];

type PopupItemProps = {
  quest: Quest;
  verifyHandler: (questId: string) => void;
  questsState: QuestState[];
  account: string,
  isVerify: boolean,
}

const PopupItem: FC<PopupItemProps> = ({
  quest,
  verifyHandler,
  account,
  questsState,
  isVerify,
}) => {
  const [currentQuestState, setCurrentQuestState] = useState();
  useEffect(() => {
    if (questsState) {
      const currentQuest = questsState.filter((item) => item.id === quest.questId)
      setCurrentQuestState(currentQuest[0].state)
    }
  }, [questsState])
  return (
    <Popup>
      <Title>
        <TrophyGoldIcon width="64px" style={{ flex: 'none' }} mr="8px" />
        {quest.title}
        <Description>{quest.description}</Description>
      </Title>
      <ButtonWrapper>
        <Button as={"a"} style={{ color:"#ffffff"  }} target="_blank" href={quest.link}>
          Let's start
        </Button>
        {account && currentQuestState ? (
          <Button style={{ color:"#ffffff", backgroundColor: "#a564d4"  }} onClick={() => verifyHandler(quest.questId)}>
            Done
          </Button>
        ): account && !currentQuestState ? (
          <Button
            isLoading={isVerify}
            style={{ color:"#ffffff"  }} 
            onClick={() => verifyHandler(quest.questId)}>
            Verify
          </Button>
        ): (
          <ConnectWalletButton />
        )}
      </ButtonWrapper>
    </Popup>
  )
}

const NextButton = styled(Button)`
  color: #a564d4;
  background-color: transparent;
  box-shadow: none;
  height: 20px;
  position: absolute;
  bottom: 20px;
  right: 40px;
`
const Message = styled.div`
  color: #d82424;
  text-align: end;
  position: absolute;
  bottom: 40px;
  right: 50px;
`

const StepsPopup: React.FC<React.PropsWithChildren> = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [questsState, setQuestsState] = useState<QuestState[]>();
  const [isVerify, setIsVerify] = useState(false);
  const [ message, setMessage ] = useState("");
  const { account } = useActiveWeb3React();

  const toggleModal = (e) => {
    setOpacity(0);
    setIsOpen(!isOpen);
  };

  const verifyHandler = ( questId: string ) => {
    setIsVerify(true);
    const url = `https://beta-api.genki.io/v1/quests/${questId}/verify`
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GENKIAPI_KEY}`,
    };
    const body = {
      "user_address": account
    }
    fetch(url , {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("verify",data);
      if (!data.verify_result) {
        const questTitle = Quests.filter((quest) => quest.questId === questId)[0].title
        setMessage(`You didn't complete ${questTitle} quest`)
        setTimeout(() => {
          setMessage("")
        },2000)
      }
      getUserStatus();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getUserStatus = () => {
    setIsVerify(false);
    const url = `https://beta-api.genki.io/v1/campaigns/HG6GPK/users/${account}`
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GENKIAPI_KEY}`,
    };
    fetch(url , {
      method: "GET",
      headers: headers,
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log("UserStatus", data);
      
      const stateOrganis = Object.entries(data.quests)
      .map(([questId, state]) => {
        return {id: questId, state: state}
      });
      setQuestsState(stateOrganis)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getUserStatus();
  }, [])
  return (
    <CSSTransition in={isOpen} unmountOnExit timeout={1000} classNames="popup">
      <Wrapper
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}>
        <PopupButton variant="text" onClick={toggleModal}>
          <CloseIcon color="primary" width="24px" />
        </PopupButton>
        
        <CustomCarousel
        style={{width: "400px"}}
        isRTL={false} itemsToShow={1}
        showArrows={false}
        >
        {
          Quests.map((quest) => (
            <PopupItem 
              quest={quest}
              verifyHandler={verifyHandler}
              questsState={questsState}
              account={account}
              isVerify={isVerify}
              />
          ))
        }
        </CustomCarousel>
      <Message>{message}</Message>
      </Wrapper>
    </CSSTransition>
  )
}

export default StepsPopup;
