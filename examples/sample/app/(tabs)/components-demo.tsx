import React, { useState } from "react";
import { Image } from "expo-image";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  useColorScheme,
} from "react-native";
import { Button } from "../../lib/components/Button/Button";
import { Card } from "../../lib/components/Card/Card";
import BottomSheet from "../../lib/components/BottomSheet/BottomSheet";
import { ImagePreview } from "../../lib/components/ImagePreview/ImagePreview";
import { LucideChevronLeft, LucideChevronRight, Star } from "lucide-react-native";
import { Colors } from "@/constants/theme";

const SINGLE_IMAGE =
  "https://images.pexels.com/photos/208747/pexels-photo-208747.jpeg";
const MULTIPLE_IMAGES = [
  "https://images.pexels.com/photos/208747/pexels-photo-208747.jpeg",
  "https://images.pexels.com/photos/173229/pexels-photo-173229.jpeg",
  "https://images.pexels.com/photos/32114607/pexels-photo-32114607.jpeg",
];

export default function ComponentsDemoScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  // BottomSheet states
  const [basicSheetVisible, setBasicSheetVisible] = useState(false);
  const [noHeaderSheetVisible, setNoHeaderSheetVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [noDragSheetVisible, setNoDragSheetVisible] = useState(false);

  // ImagePreview states
  const [singleImageVisible, setSingleImageVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handlePress = (buttonName: string) => {
    Alert.alert("Button Pressed", `You pressed: ${buttonName}`);
  };

  const handleLoadingDemo = (buttonId: string) => {
    setLoadingButton(buttonId);
    setTimeout(() => {
      setLoadingButton(null);
      Alert.alert("Action Complete", "Loading simulation finished!");
    }, 2000);
  };

  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Prizmux Components Demo</Text>
        <Text style={[styles.subtitle, { color: theme.subtext }]}>Button & Card Showcase</Text>
      </View>

      {/* Button Variants Section */}
      <Card style={styles.sectionCard} backgroundColor={theme.card} shadowColor={shadowColor}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Button Variants</Text>
        <Text style={[styles.sectionDescription, { color: theme.subtext }]}>
          Filled and outline button styles
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Filled Primary"
            icon={<Star size={16} color={theme.background} />}
            variant="filled"
            onPress={() => handlePress("Filled Primary")}
            backgroundColor={theme.text}
            textColor={theme.background}
          />
          <Button
            title="Outline Primary"
            variant="outline"
            onPress={() => handlePress("Outline Primary")}
            backgroundColor="transparent"
            textColor={theme.text}
            borderColor={theme.text}
          />
        </View>
      </Card>

      {/* Button Sizes Section */}
      <Card style={styles.sectionCard} backgroundColor={theme.card} shadowColor={shadowColor}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Button Sizes</Text>
        <Text style={[styles.sectionDescription, { color: theme.subtext }]}>
          Small, medium, and large button sizes
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Small Button"
            size="small"
            variant="filled"
            onPress={() => handlePress("Small")}
            backgroundColor={theme.text}
            textColor={theme.background}
          />
          <Button
            title="Medium Button"
            size="medium"
            variant="filled"
            onPress={() => handlePress("Medium")}
            backgroundColor={theme.text}
            textColor={theme.background}
          />
          <Button
            title="Large Button"
            size="large"
            variant="filled"
            onPress={() => handlePress("Large")}
            backgroundColor={theme.text}
            textColor={theme.background}
          />
        </View>
      </Card>

      {/* Button States Section */}
      <Card style={styles.sectionCard} backgroundColor={theme.card} shadowColor={shadowColor}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Button States</Text>
        <Text style={[styles.sectionDescription, { color: theme.subtext }]}>
          Loading, disabled, and active states
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Loading Demo"
            variant="filled"
            isLoading={loadingButton === "loading-demo"}
            onPress={() => handleLoadingDemo("loading-demo")}
            backgroundColor={theme.text}
            textColor={theme.background}
            loadingColor={theme.background}
          />
          <Button
            title="Disabled Filled"
            variant="filled"
            disabled
            onPress={() => handlePress("Disabled Filled")}
            backgroundColor={theme.text}
            textColor={theme.background}
            disabledBackgroundColor={theme.border}
            disabledTextColor={theme.subtext}
          />
          <Button
            title="Disabled Outline"
            variant="outline"
            disabled
            onPress={() => handlePress("Disabled Outline")}
            backgroundColor="transparent"
            textColor={theme.text}
            borderColor={theme.text}
            disabledBorderColor={theme.border}
            disabledTextColor={theme.subtext}
          />
        </View>
      </Card>

      {/* Full Width Buttons */}
      <Card style={styles.sectionCard} backgroundColor={theme.card} shadowColor={shadowColor}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Full Width Buttons</Text>
        <Text style={[styles.sectionDescription, { color: theme.subtext }]}>
          Buttons that span the full container width
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Full Width Filled"
            variant="filled"
            fullWidth
            onPress={() => handlePress("Full Width Filled")}
            backgroundColor={theme.text}
            textColor={theme.background}
          />
          <Button
            title="Full Width Outline"
            variant="outline"
            fullWidth
            onPress={() => handlePress("Full Width Outline")}
            backgroundColor="transparent"
            textColor={theme.text}
            borderColor={theme.text}
          />
        </View>
      </Card>

      {/* Card Variations Section */}
      <Card style={styles.sectionCard} backgroundColor={theme.card} shadowColor={shadowColor}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Card Component</Text>
        <Text style={[styles.sectionDescription, { color: theme.subtext }]}>
          Card component with various content types
        </Text>
      </Card>

      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Basic Card</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          This is a basic card with default styling. It includes shadow, rounded
          corners, and padding.
        </Text>
      </Card>

      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Interactive Card</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          Cards can contain any content, including buttons and other components.
        </Text>
        <View style={styles.cardActions}>
          <Button
            title="Cancel"
            variant="outline"
            size="small"
            onPress={() => handlePress("Card Cancel")}
            style={{ flex: 1 }}
            backgroundColor="transparent"
            textColor={theme.text}
            borderColor={theme.text}
          />
          <Button
            title="Confirm"
            variant="filled"
            size="small"
            onPress={() => handlePress("Card Confirm")}
            style={{ flex: 1 }}
            backgroundColor={theme.text}
            textColor={theme.background}
          />
        </View>
      </Card>

      <Card
        backgroundColor={theme.card}
        shadowColor={shadowColor}
        style={[styles.customCard, { borderLeftColor: theme.text, marginBottom: 16 }]}
      >
        <Text style={[styles.cardTitle, { color: theme.text }]}>Custom Styled Card</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          This card has custom styling applied, demonstrating the flexibility of
          the Card component.
        </Text>
        <Button
          title="Action"
          variant="filled"
          size="small"
          fullWidth
          onPress={() => handlePress("Custom Card Action")}
          backgroundColor={theme.text}
          textColor={theme.background}
        />
      </Card>

      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Nested Card Example</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          Cards can contain other cards for complex layouts.
        </Text>
        <Card style={styles.nestedCard} backgroundColor={theme.background} shadowColor={shadowColor}>
          <Text style={[styles.nestedCardText, { color: theme.subtext }]}>This is a nested card</Text>
          <Button
            title="Nested Action"
            variant="outline"
            size="small"
            fullWidth
            onPress={() => handlePress("Nested Card")}
            backgroundColor="transparent"
            textColor={theme.text}
            borderColor={theme.text}
          />
        </Card>
      </Card>

      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Statistics Card</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>1,234</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Users</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>56</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Projects</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>98%</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Success</Text>
          </View>
        </View>
      </Card>

      {/* ─── BottomSheet Section ─────────────────────────────────── */}
      <Card style={styles.sectionCard} backgroundColor={theme.card} shadowColor={shadowColor}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>BottomSheet Component</Text>
        <Text style={[styles.sectionDescription, { color: theme.subtext }]}>
          Swipeable bottom sheet with various configurations
        </Text>
      </Card>

      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Basic BottomSheet</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          Default sheet with title, drag handle, close button, and backdrop dismiss.
        </Text>
        <Button
          title="Open Basic Sheet"
          variant="filled"
          fullWidth
          onPress={() => setBasicSheetVisible(true)}
          backgroundColor={theme.text}
          textColor={theme.background}
        />
      </Card>

      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>No Header Sheet</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          Sheet without a title or close button — only the drag handle and swipe
          gesture to dismiss.
        </Text>
        <Button
          title="Open No Header Sheet"
          variant="outline"
          fullWidth
          onPress={() => setNoHeaderSheetVisible(true)}
          backgroundColor="transparent"
          textColor={theme.text}
          borderColor={theme.text}
        />
      </Card>

      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Action Sheet</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          Sheet used as an action menu with a list of choices inside.
        </Text>
        <Button
          title="Open Action Sheet"
          variant="filled"
          fullWidth
          onPress={() => setActionSheetVisible(true)}
          backgroundColor={theme.text}
          textColor={theme.background}
        />
      </Card>

      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>No Drag Handle Sheet</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          Drag handle and swipe-to-close disabled. Must use the close button or
          tap the backdrop.
        </Text>
        <Button
          title="Open No Drag Sheet"
          variant="outline"
          fullWidth
          onPress={() => setNoDragSheetVisible(true)}
          backgroundColor="transparent"
          textColor={theme.text}
          borderColor={theme.text}
        />
      </Card>

      {/* ─── ImagePreview Section ────────────────────────────────── */}
      <Card style={styles.sectionCard} backgroundColor={theme.card} shadowColor={shadowColor}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>ImagePreview Component</Text>
        <Text style={[styles.sectionDescription, { color: theme.subtext }]}>
          Tap an image to view it in full screen
        </Text>
      </Card>

      {/* Avatar style — tap to preview */}
      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>User Profile</Text>
        <View style={styles.profileRow}>
          <Pressable onPress={() => setSingleImageVisible(true)}>
            <Image
              source={{ uri: SINGLE_IMAGE }}
              style={styles.avatar}
            />
          </Pressable>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.text }]}>John Doe</Text>
            <Text style={[styles.profileRole, { color: theme.subtext }]}>Software Engineer</Text>
            <Text style={[styles.profileHint, { color: theme.subtext, opacity: 0.6 }]}>Tap avatar to preview</Text>
          </View>
        </View>
      </Card>

      {/* Feed style — tap any image to open gallery from that position */}
      <Card backgroundColor={theme.card} shadowColor={shadowColor} style={{ marginBottom: 16 }}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Photo Feed</Text>
        <Text style={[styles.cardContent, { color: theme.subtext }]}>
          Tap any photo to open the full gallery.
        </Text>
        <View style={styles.feedGrid}>
          {MULTIPLE_IMAGES.map((uri, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setGalleryIndex(index);
                setGalleryVisible(true);
              }}
            >
              <Image
                source={{ uri }}
                style={styles.feedImage}
                contentFit="cover"
              />
            </Pressable>
          ))}
        </View>
      </Card>

      {/* ─── BottomSheet instances ───────────────────────────────── */}
      <BottomSheet
        visible={basicSheetVisible}
        onClose={() => setBasicSheetVisible(false)}
        title="Basic Bottom Sheet"
        backgroundColor={theme.background}
        textColor={theme.text}
        backdropColor="rgba(0,0,0,0.5)"
        handleColor={theme.border}
      >
        <Text style={[styles.sheetBodyText, { color: theme.text }]}>
          This is the default bottom sheet. You can swipe it down, tap the
          backdrop, or press the close button to dismiss it.
        </Text>
        <Button
          title="Got it"
          variant="filled"
          fullWidth
          onPress={() => setBasicSheetVisible(false)}
          backgroundColor={theme.text}
          textColor={theme.background}
        />
      </BottomSheet>

      <BottomSheet
        visible={noHeaderSheetVisible}
        onClose={() => setNoHeaderSheetVisible(false)}
        showCloseButton={false}
        backgroundColor={theme.background}
        handleColor={theme.border}
      >
        <Text style={[styles.sheetBodyText, { color: theme.text }]}>
          No title or close button here. Swipe down or tap the backdrop to dismiss.
        </Text>
      </BottomSheet>

      <BottomSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        title="Choose an Action"
        backgroundColor={theme.background}
        textColor={theme.text}
        handleColor={theme.border}
        headerStyle={{ borderBottomColor: theme.border }}
      >
        <View style={styles.actionList}>
          {["Edit", "Duplicate", "Share", "Delete"].map((action) => (
            <Button
              key={action}
              title={action}
              variant={action === "Delete" ? "outline" : "filled"}
              fullWidth
              onPress={() => {
                setActionSheetVisible(false);
                handlePress(action);
              }}
              backgroundColor={action === "Delete" ? "transparent" : theme.text}
              textColor={action === "Delete" ? theme.text : theme.background}
              borderColor={action === "Delete" ? theme.text : "transparent"}
            />
          ))}
        </View>
      </BottomSheet>

      <BottomSheet
        visible={noDragSheetVisible}
        onClose={() => setNoDragSheetVisible(false)}
        title="No Drag Sheet"
        showDragHandle={false}
        swipeToClose={false}
        backgroundColor={theme.background}
        textColor={theme.text}
        closeIconStyle={{ color: theme.text }}
      >
        <Text style={[styles.sheetBodyText, { color: theme.text }]}>
          Drag handle and swipe-to-close are both disabled. Use the close
          button or tap outside to dismiss.
        </Text>
        <Button
          title="Close"
          variant="outline"
          fullWidth
          onPress={() => setNoDragSheetVisible(false)}
          backgroundColor="transparent"
          textColor={theme.text}
          borderColor={theme.text}
        />
      </BottomSheet>

      {/* ─── ImagePreview instances ──────────────────────────────── */}
      <ImagePreview
        visible={singleImageVisible}
        images={SINGLE_IMAGE}
        title="John Doe"
        onClose={() => setSingleImageVisible(false)}
        backgroundColor={theme.background}
        textColor={theme.text}
        headerBackgroundColor="transparent"
      />

      <ImagePreview
        visible={galleryVisible}
        nextIcon={<LucideChevronRight color={theme.background}/> } 
        prevIcon={<LucideChevronLeft color={theme.background}/> }
        images={MULTIPLE_IMAGES}
        initialIndex={galleryIndex}
        onClose={() => setGalleryVisible(false)}
        backgroundColor={theme.background}
        textColor={theme.text}
        buttonBackgroundColor={theme.text}
        headerBackgroundColor="transparent"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  buttonGroup: {
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  customCard: {
    borderLeftWidth: 4,
  },
  nestedCard: {
    marginTop: 12,
  },
  nestedCardText: {
    fontSize: 14,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
  },
  sheetBodyText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  actionList: {
    gap: 12,
    paddingBottom: 8,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileRole: {
    fontSize: 14,
    marginTop: 2,
  },
  profileHint: {
    fontSize: 12,
    marginTop: 4,
  },
  feedGrid: {
    flexDirection: "row",
    gap: 6,
  },
  feedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});