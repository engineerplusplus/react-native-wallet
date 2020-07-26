/**
 * @format
 */
import React from 'react';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { SafeAreaLayout } from 'src/components/safe-area-layout.component';
import ContentView from 'src/layouts/auth/welcome';

export const WelcomeScreen = ({ navigation }: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      edges={['right', 'bottom', 'left']}
    >
      <ContentView navigation={navigation}/>
    </SafeAreaLayout>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
