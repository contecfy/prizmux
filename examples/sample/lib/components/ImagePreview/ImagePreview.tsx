import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ImagePreviewProps } from './ImagePreview.types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DefaultCloseIcon = () => <Text style={styles.defaultIcon}>✕</Text>;
const DefaultPrevIcon = () => <Text style={styles.navIcon}>‹</Text>;
const DefaultNextIcon = () => <Text style={styles.navIcon}>›</Text>;

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  visible,
  images,
  initialIndex = 0,
  onClose,
  title,
  closeIcon,
  prevIcon,
  nextIcon,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  // Only show loader if image takes more than 300ms — avoids flash for cached/fast images
  const [loadingVisible, setLoadingVisible] = useState<{ [key: number]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const loadTimers = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});
  const scrollViewRef = useRef<ScrollView>(null);

  const imageArray = Array.isArray(images) ? images : [images];
  const hasMultipleImages = imageArray.length > 1;

  const clearTimer = (index: number) => {
    if (loadTimers.current[index]) {
      clearTimeout(loadTimers.current[index]);
      delete loadTimers.current[index];
    }
  };

  useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
      setLoadingVisible({});
      setImageErrors({});
      if (hasMultipleImages && scrollViewRef.current) {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: initialIndex * SCREEN_WIDTH,
            animated: false,
          });
        }, 100);
      }
    } else {
      // Clear all pending timers on close
      Object.keys(loadTimers.current).forEach((k) => clearTimer(Number(k)));
      setLoadingVisible({});
      setImageErrors({});
    }
  }, [visible, initialIndex, hasMultipleImages]);

  const handleLoadStart = (index: number) => {
    clearTimer(index);
    // Only show spinner if image hasn't loaded within 300ms
    loadTimers.current[index] = setTimeout(() => {
      setLoadingVisible((prev) => ({ ...prev, [index]: true }));
    }, 300);
  };

  const handleLoadEnd = (index: number) => {
    clearTimer(index);
    setLoadingVisible((prev) => ({ ...prev, [index]: false }));
  };

  const handleError = (index: number) => {
    clearTimer(index);
    setLoadingVisible((prev) => ({ ...prev, [index]: false }));
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < imageArray.length) {
      setCurrentIndex(index);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({ x: newIndex * SCREEN_WIDTH, animated: true });
    }
  };

  const goToNext = () => {
    if (currentIndex < imageArray.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollViewRef.current?.scrollTo({ x: newIndex * SCREEN_WIDTH, animated: true });
    }
  };

  const renderImage = (uri: string, index: number) => (
    <View key={index} style={styles.imageContainer}>
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="contain"
        onLoadStart={() => handleLoadStart(index)}
        onLoad={() => handleLoadEnd(index)}
        onError={() => handleError(index)}
      />
      {loadingVisible[index] && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
      {imageErrors[index] && (
        <View style={styles.loaderOverlay}>
          <Text style={styles.errorText}>Failed to load image</Text>
        </View>
      )}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          {title && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
          {hasMultipleImages && (
            <Text style={styles.counter}>
              {currentIndex + 1} / {imageArray.length}
            </Text>
          )}
          <Pressable style={styles.closeButton} onPress={onClose}>
            {closeIcon ?? <DefaultCloseIcon />}
          </Pressable>
        </View>

        {/* Images */}
        {hasMultipleImages ? (
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.scrollView}
          >
            {imageArray.map((uri, index) => renderImage(uri, index))}
          </ScrollView>
        ) : (
          renderImage(imageArray[0] ?? '', 0)
        )}

        {/* Nav buttons — centred with translateY so they sit exactly in the middle */}
        {hasMultipleImages && (
          <>
            {currentIndex > 0 && (
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton]}
                onPress={goToPrevious}
                activeOpacity={0.7}
              >
                {prevIcon ?? <DefaultPrevIcon />}
              </TouchableOpacity>
            )}
            {currentIndex < imageArray.length - 1 && (
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={goToNext}
                activeOpacity={0.7}
              >
                {nextIcon ?? <DefaultNextIcon />}
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </Modal>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 10,
  },
  counter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 15,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  // Nav buttons — use top 50% + translateY(-half height) for true vertical centering
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }], // half of height (50) to truly center
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  prevButton: {
    left: 16,
  },
  nextButton: {
    right: 16,
  },
  defaultIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  navIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 20,
    // marginBottom: 6, // visually center the arrow within the circle
   
  },
});