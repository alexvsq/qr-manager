import { useState, useEffect } from "react";
import { ScreensTexts } from '@/types/types'
import { useContextData } from '@/contexts/context'

export const useScreensTexts = () => {

  const { screen } = useContextData();

  const [titleCard, setTitleCard] = useState<string>('');
  const [subtitleCard, setSubtitleCard] = useState<string>('');
  const [secondBtn, setSecondBtn] = useState<string | undefined>('');


  useEffect(() => {


  }, [screen])

  return {
    secondBtn,
    titleCard,
    subtitleCard
  };
};
