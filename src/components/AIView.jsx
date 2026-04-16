import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { handleInput } from '../Order';
import ChatView from './ChatView';
import WelcomeView from './WelcomeView';

export default function () {
  const [messages, setMessages] = useState([]);
  const [inputBarText, setInputBarText] = useState('');
  const scrollViewRef = useRef(null);

  const scrollToBottom = (animated = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => scrollToBottom());
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => scrollToBottom());

    scrollToBottom(false);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const pushConversation = (userText) => {
    if (userText.trim().length === 0) return;

    const userMessage = { direction: 'right', text: userText };
    const botResponses = handleInput(userText);

    const newMessages = [
      userMessage,
      ...botResponses.map((message) => ({ direction: 'left', text: message }))
    ];

    setMessages((prev) => [...prev, ...newMessages]);
    setInputBarText('');
  };

  const sendMessage = () => {
    pushConversation(inputBarText);
  };

  const sendPromptMessage = (promptText) => {
    pushConversation(promptText);
  };

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {messages.length ? (
          <ChatView
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
            scrollViewRef={scrollViewRef}
            styles={styles}
            messages={messages}
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}
          />
        ) : (
          <WelcomeView
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}
            onPromptPress={sendPromptMessage}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff'
  },

  messages: {
    flex: 1
  }
});