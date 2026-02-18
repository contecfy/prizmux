import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { Button } from "../../lib/components/Button/Button";
import { Card } from "../../lib/components/Card/Card";
import BottomSheet from "../../lib/components/BottomSheet/BottomSheet";
import { ImagePreview } from "../../lib/components/ImagePreview/ImagePreview";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react-native";

const SINGLE_IMAGE =
  "https://images.pexels.com/photos/208747/pexels-photo-208747.jpeg";
const MULTIPLE_IMAGES = [
  "https://images.pexels.com/photos/208747/pexels-photo-208747.jpeg",
  "https://images.pexels.com/photos/173229/pexels-photo-173229.jpeg",
  "https://images.pexels.com/photos/32114607/pexels-photo-32114607.jpeg",
];

export default function ComponentsDemoScreen() {
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Prizmux Components Demo</Text>
        <Text style={styles.subtitle}>Button & Card Showcase</Text>
      </View>

      {/* Button Variants Section */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Button Variants</Text>
        <Text style={styles.sectionDescription}>
          Filled and outline button styles
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Filled Primary"
            variant="filled"
            onPress={() => handlePress("Filled Primary")}
          />
          <Button
            title="Outline Primary"
            variant="outline"
            onPress={() => handlePress("Outline Primary")}
          />
        </View>
      </Card>

      {/* Button Sizes Section */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Button Sizes</Text>
        <Text style={styles.sectionDescription}>
          Small, medium, and large button sizes
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Small Button"
            size="small"
            variant="filled"
            onPress={() => handlePress("Small")}
          />
          <Button
            title="Medium Button"
            size="medium"
            variant="filled"
            onPress={() => handlePress("Medium")}
          />
          <Button
            title="Large Button"
            size="large"
            variant="filled"
            onPress={() => handlePress("Large")}
          />
        </View>
      </Card>

      {/* Button States Section */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Button States</Text>
        <Text style={styles.sectionDescription}>
          Loading, disabled, and active states
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Loading Demo"
            variant="filled"
            isLoading={loadingButton === "loading-demo"}
            onPress={() => handleLoadingDemo("loading-demo")}
          />
          <Button
            title="Disabled Filled"
            variant="filled"
            disabled
            onPress={() => handlePress("Disabled Filled")}
          />
          <Button
            title="Disabled Outline"
            variant="outline"
            disabled
            onPress={() => handlePress("Disabled Outline")}
          />
        </View>
      </Card>

      {/* Full Width Buttons */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Full Width Buttons</Text>
        <Text style={styles.sectionDescription}>
          Buttons that span the full container width
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Full Width Filled"
            variant="filled"
            fullWidth
            onPress={() => handlePress("Full Width Filled")}
          />
          <Button
            title="Full Width Outline"
            variant="outline"
            fullWidth
            onPress={() => handlePress("Full Width Outline")}
          />
        </View>
      </Card>

      {/* Card Variations Section */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Card Component</Text>
        <Text style={styles.sectionDescription}>
          Card component with various content types
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Basic Card</Text>
        <Text style={styles.cardContent}>
          This is a basic card with default styling. It includes shadow, rounded
          corners, and padding.
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Interactive Card</Text>
        <Text style={styles.cardContent}>
          Cards can contain any content, including buttons and other components.
        </Text>
        <View style={styles.cardActions}>
          <Button
            title="Cancel"
            variant="outline"
            size="small"
            onPress={() => handlePress("Card Cancel")}
            style={{ flex: 1 }}
          />
          <Button
            title="Confirm"
            variant="filled"
            size="small"
            onPress={() => handlePress("Card Confirm")}
            style={{ flex: 1 }}
          />
        </View>
      </Card>

      <Card style={styles.customCard}>
        <Text style={styles.cardTitle}>Custom Styled Card</Text>
        <Text style={styles.cardContent}>
          This card has custom styling applied, demonstrating the flexibility of
          the Card component.
        </Text>
        <Button
          title="Action"
          variant="filled"
          size="small"
          fullWidth
          onPress={() => handlePress("Custom Card Action")}
        />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Nested Card Example</Text>
        <Text style={styles.cardContent}>
          Cards can contain other cards for complex layouts.
        </Text>
        <Card style={styles.nestedCard}>
          <Text style={styles.nestedCardText}>This is a nested card</Text>
          <Button
            title="Nested Action"
            variant="outline"
            size="small"
            fullWidth
            onPress={() => handlePress("Nested Card")}
          />
        </Card>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Statistics Card</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,234</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>56</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Success</Text>
          </View>
        </View>
      </Card>

      {/* ─── BottomSheet Section ─────────────────────────────────── */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>BottomSheet Component</Text>
        <Text style={styles.sectionDescription}>
          Swipeable bottom sheet with various configurations
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Basic BottomSheet</Text>
        <Text style={styles.cardContent}>
          Default sheet with title, drag handle, close button, and backdrop dismiss.
        </Text>
        <Button
          title="Open Basic Sheet"
          variant="filled"
          fullWidth
          onPress={() => setBasicSheetVisible(true)}
        />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>No Header Sheet</Text>
        <Text style={styles.cardContent}>
          Sheet without a title or close button — only the drag handle and swipe
          gesture to dismiss.
        </Text>
        <Button
          title="Open No Header Sheet"
          variant="outline"
          fullWidth
          onPress={() => setNoHeaderSheetVisible(true)}
        />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Action Sheet</Text>
        <Text style={styles.cardContent}>
          Sheet used as an action menu with a list of choices inside.
        </Text>
        <Button
          title="Open Action Sheet"
          variant="filled"
          fullWidth
          onPress={() => setActionSheetVisible(true)}
        />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>No Drag Handle Sheet</Text>
        <Text style={styles.cardContent}>
          Drag handle and swipe-to-close disabled. Must use the close button or
          tap the backdrop.
        </Text>
        <Button
          title="Open No Drag Sheet"
          variant="outline"
          fullWidth
          onPress={() => setNoDragSheetVisible(true)}
        />
      </Card>

      {/* ─── ImagePreview Section ────────────────────────────────── */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>ImagePreview Component</Text>
        <Text style={styles.sectionDescription}>
          Tap an image to view it in full screen
        </Text>
      </Card>

      {/* Avatar style — tap to preview */}
      <Card>
        <Text style={styles.cardTitle}>User Profile</Text>
        <View style={styles.profileRow}>
          <Pressable onPress={() => setSingleImageVisible(true)}>
            <Image
              source={{ uri: SINGLE_IMAGE }}
              style={styles.avatar}
            />
          </Pressable>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileRole}>Software Engineer</Text>
            <Text style={styles.profileHint}>Tap avatar to preview</Text>
          </View>
        </View>
      </Card>

      {/* Feed style — tap any image to open gallery from that position */}
      <Card>
        <Text style={styles.cardTitle}>Photo Feed</Text>
        <Text style={styles.cardContent}>
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
                resizeMode="cover"
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
      >
        <Text style={styles.sheetBodyText}>
          This is the default bottom sheet. You can swipe it down, tap the
          backdrop, or press the close button to dismiss it.
        </Text>
        <Button
          title="Got it"
          variant="filled"
          fullWidth
          onPress={() => setBasicSheetVisible(false)}
        />
      </BottomSheet>

      <BottomSheet
        visible={noHeaderSheetVisible}
        onClose={() => setNoHeaderSheetVisible(false)}
        showCloseButton={false}
      >
        <Text style={styles.sheetBodyText}>
          No title or close button here. Swipe down or tap the backdrop to dismiss.
        </Text>
      </BottomSheet>

      <BottomSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        title="Choose an Action"
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
      >
        <Text style={styles.sheetBodyText}>
          Drag handle and swipe-to-close are both disabled. Use the close
          button or tap outside to dismiss.
        </Text>
        <Button
          title="Close"
          variant="outline"
          fullWidth
          onPress={() => setNoDragSheetVisible(false)}
        />
      </BottomSheet>

      {/* ─── ImagePreview instances ──────────────────────────────── */}
      <ImagePreview
        visible={singleImageVisible}
        images={SINGLE_IMAGE}
        title="John Doe"
        onClose={() => setSingleImageVisible(false)}
      />

      <ImagePreview
        visible={galleryVisible}
        nextIcon={<LucideChevronRight color={"#fff"}/> } 
        prevIcon={<LucideChevronLeft color={"#fff"}/> }
        images={MULTIPLE_IMAGES}
        initialIndex={galleryIndex}
        onClose={() => setGalleryVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  buttonGroup: {
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  customCard: {
    backgroundColor: "#EEF2FF",
    borderLeftWidth: 4,
    borderLeftColor: "#6366F1",
  },
  nestedCard: {
    marginTop: 12,
    backgroundColor: "#F9FAFB",
  },
  nestedCardText: {
    fontSize: 14,
    color: "#6B7280",
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
    color: "#1F2937",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
  },
  sheetBodyText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 20,
  },
  actionList: {
    gap: 12,
    paddingBottom: 8,
  },
  // ImagePreview styles
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
    color: "#1F2937",
  },
  profileRole: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  profileHint: {
    fontSize: 12,
    color: "#9CA3AF",
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