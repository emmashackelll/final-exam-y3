import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import InputBar from './InputBar';

export default function ({
  scrollToBottom,
  sendMessage,
  setInputBarText,
  inputBarText,
  onPromptPress
}) {
  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80'
          }}
          style={styles.heroImage}
        />

        <Text style={styles.heroTitle}>Emma’s Hair Salon</Text>
        <Text style={styles.heroSubtitle}>
          Book your cut in seconds. Choose a style, answer a few quick questions,
          and let the assistant guide your order.
        </Text>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.actionsTitle}>Try a quick action</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onPromptPress('buzz cut')}
          >
            <Text style={styles.actionButtonText}>Buzz cut</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onPromptPress('regular cut')}
          >
            <Text style={styles.actionButtonText}>Regular cut</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onPromptPress('1 blade')}
          >
            <Text style={styles.actionButtonText}>1 blade</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onPromptPress('2 blade')}
          >
            <Text style={styles.actionButtonText}>2 blade</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputSection}>
        <InputBar
          onSendPressed={sendMessage}
          onSizeChange={() => scrollToBottom(false)}
          onChangeText={setInputBarText}
          text={inputBarText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 10
  },

  heroSection: {
    height: '52%',
    justifyContent: 'flex-start'
  },

  heroImage: {
    width: '100%',
    height: 200, // 👈 force a real height
    borderRadius: 18,
    marginBottom: 14
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8
  },

  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6b7280'
  },

  actionsSection: {
    paddingTop: 10,
    paddingBottom: 12
  },

  actionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10
  },

  actionButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center'
  },

  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827'
  },

  inputSection: {
    paddingBottom: 4
  }
});