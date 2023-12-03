'use client'
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

interface InvoiceTitleProps {
  title: string;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  reportTitle: {
    color: '#61dafb',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

const InvoiceTitle: React.FC<InvoiceTitleProps> = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default InvoiceTitle;
