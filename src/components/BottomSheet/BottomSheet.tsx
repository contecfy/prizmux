import { Colors } from '@/constants/theme';
import { LucideX } from 'lucide-react-native';
import React, { useEffect, useRef,useState, useCallback} from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    Pressable,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from 'react-native';

const ThemedView = View;
const ThemedText = ({ style, children, type = 'default' }: any) => <Text style={[{ fontSize: type === 'title' ? 18 : 14, fontWeight: type === 'title' ? '600' : '400', color: Colors.light.text }, style]}>{children}</Text>;



const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type Props = {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    dismissOnTouchOutside?: boolean;
    showCloseButton?: boolean;
    showDragHandle?: boolean;
    swipeToClose?: boolean;
};

export default function BottomSheet({
    visible,
    onClose,
    title,
    children,
    dismissOnTouchOutside = true,
    showCloseButton = true,
    showDragHandle = true,
    swipeToClose = true,
}: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropAnim = useRef(new Animated.Value(0)).current;
    const [dynamicHeight, setDynamicHeight] = useState(SCREEN_HEIGHT * 0.6); // Start with a default

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return swipeToClose && gestureState.dy > 5; // Only swipe down
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    slideAnim.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > dynamicHeight * 0.4) {
                    closeModal();
                } else {
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 5,
                    }).start();
                }
            },
        })
    ).current;

    const openModal = useCallback(() => {
        Animated.parallel([
            Animated.timing(backdropAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 0,
            }),
        ]).start();
    }, [backdropAnim, slideAnim]);

    const closeModal = useCallback(() => {
        Animated.parallel([
            Animated.timing(backdropAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: dynamicHeight,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    }, [backdropAnim, slideAnim, dynamicHeight, onClose]);

    useEffect(() => {
        if (visible) {
            openModal();
        } else {
            // This will trigger the close animation when visibility is lost
            // It might not be needed if closeModal is always called
        }
    }, [visible, openModal]);

    const handleBackdropPress = () => {
        if (dismissOnTouchOutside) {
            closeModal();
        }
    };

    if (!visible) return null;

    return (
        <Modal
            animationType="none"
            transparent
            visible={visible}
            onRequestClose={closeModal}
            statusBarTranslucent
        >
            {/* Backdrop */}
            <Pressable style={styles.backdropPressable} onPress={handleBackdropPress}>
                <Animated.View
                    style={[
                        styles.backdrop,
                        {
                            backgroundColor: Colors.light.shadow === 'black' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            opacity: backdropAnim,
                        },
                    ]}
                />
            </Pressable>

            {/* Modal Content */}
            <Animated.View
                style={[
                    styles.modalContainer,
                    {
                        maxHeight: SCREEN_HEIGHT * 0.9, // Set a max height
                        transform: [{ translateY: slideAnim }],
                        backgroundColor: Colors.light.background,
                        shadowColor: Colors.light.shadow,
                        shadowOffset: { width: 0, height: -3 },
                        shadowOpacity: colorScheme === 'light' ? 0.1 : 0.3,
                        shadowRadius: 5,
                        elevation: 10,
                    },
                ]}
                onLayout={(event) => {
                    const { height: layoutHeight } = event.nativeEvent.layout;
                    setDynamicHeight(layoutHeight);
                    // If modal is opening, start anim from this new height
                    if (visible) {
                        slideAnim.setValue(layoutHeight);
                        openModal();
                    }
                }}
                {...panResponder.panHandlers}
            >
                {/* Modal Content Wrapper */}
                <ThemedView
                    style={[
                        styles.modalContent,
                        { backgroundColor: Colors.light.background },
                    ]}
                >
                    {/* Drag Handle */}
                    {showDragHandle && (
                        <View style={styles.dragHandleContainer}>
                            <View
                                style={[
                                    styles.dragHandle,
                                    { backgroundColor: Colors.light.borderColor },
                                ]}
                            />
                        </View>
                    )}

                    {/* Header */}
                    {(title || showCloseButton) && (
                        <View style={[styles.header, { borderBottomColor: Colors.light.borderColor }]}>
                            <View style={styles.titleContainer}>
                                {title && (
                                    <ThemedText type="title" style={[styles.title, { color: Colors.light.text }]}>
                                        {title}
                                    </ThemedText>
                                )}
                            </View>

                            {showCloseButton && (
                                <Pressable
                                    style={[
                                        styles.closeButton,
                                        { backgroundColor: Colors.light.lightShade },
                                    ]}
                                    onPress={closeModal}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <LucideX size={16} color={Colors.light.icon} />
                                </Pressable>
                            )}
                        </View>
                    )}

                    {/* Content */}
                    <View style={styles.contentContainer}>{children}</View>
                </ThemedView>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdropPressable: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1, // Ensure the Pressable handles the press event first
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        zIndex: 2, // Ensure the modal is above the backdrop
    },
    modalContent: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    dragHandleContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    dragHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
})