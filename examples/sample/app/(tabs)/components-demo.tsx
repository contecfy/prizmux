import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { Button } from "../../lib/components/Button/Button";
import { Card } from "../../lib/components/Card/Card";
import BottomSheet from "../../lib/components/BottomSheet/BottomSheet";

export default function ComponentsDemoScreen() {
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  // BottomSheet states
  const [basicSheetVisible, setBasicSheetVisible] = useState(false);
  const [noHeaderSheetVisible, setNoHeaderSheetVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [noDragSheetVisible, setNoDragSheetVisible] = useState(false);

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

      {/* Basic Card */}
      <Card>
        <Text style={styles.cardTitle}>Basic Card</Text>
        <Text style={styles.cardContent}>
          This is a basic card with default styling. It includes shadow, rounded
          corners, and padding.
        </Text>
      </Card>

      {/* Card with Button */}
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

      {/* Custom Styled Card */}
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

      {/* Nested Cards */}
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

      {/* Statistics Card */}
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

      {/* Basic BottomSheet */}
      <Card>
        <Text style={styles.cardTitle}>Basic BottomSheet</Text>
        <Text style={styles.cardContent}>
          Default sheet with title, drag handle, close button, and backdrop
          dismiss.
        </Text>
        <Button
          title="Open Basic Sheet"
          variant="filled"
          fullWidth
          onPress={() => setBasicSheetVisible(true)}
        />
      </Card>

      {/* No Header BottomSheet */}
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

      {/* Action Sheet */}
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

      {/* No Drag / No Swipe Sheet */}
      <Card>
        <Text style={styles.cardTitle}>No Drag Handle Sheet</Text>
        <Text style={styles.cardContent}>
          Sheet with drag handle and swipe-to-close disabled. Must use the
          close button or tap the backdrop.
        </Text>
        <Button
          title="Open No Drag Sheet"
          variant="outline"
          fullWidth
          onPress={() => setNoDragSheetVisible(true)}
        />
      </Card>

      {/* ─── BottomSheet instances ───────────────────────────────── */}

      {/* Basic */}
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

      {/* No Header */}
      <BottomSheet
        visible={noHeaderSheetVisible}
        onClose={() => setNoHeaderSheetVisible(false)}
        showCloseButton={false}
      >
        <Text style={styles.sheetBodyText}>
          No title or close button here. Swipe down or tap the backdrop to
          dismiss.
        </Text>
      </BottomSheet>

      {/* Action Sheet */}
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

      {/* No Drag */}
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
  // BottomSheet demo styles
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
});