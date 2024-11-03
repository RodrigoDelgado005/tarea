import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, Dimensions } from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 250;
const { width } = Dimensions.get('window');

type Props = PropsWithChildren<{
  headerBackgroundColor: { light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView 
        ref={scrollRef} 
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  scrollContainer: {
    flexGrow: 1,
    width: width,
  },
});