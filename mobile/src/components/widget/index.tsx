import React, { useRef, useState } from 'react';
import { ChatTeardropDots } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { theme } from '../../theme';

import { styles } from './styles';
import { Options } from '../options';
import { Form } from '../form';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Success } from '../success';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>();
  const [feedbackSent, setFeedbackSent] = useState<boolean>();

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent
            ? <Success onSendAnotherFeedback={handleRestartFeedback} />
            : <>
              {
                feedbackType
                  ? <Form type={feedbackType} onFeedbackCanceled={handleRestartFeedback} onFeedbackSent={handleFeedbackSent} />
                  : <Options onFeedbackTypeChanged={setFeedbackType} />
              }
            </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
