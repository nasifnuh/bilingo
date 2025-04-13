import { Modal, View, Text } from "react-native";
import { FormattedMessage } from "react-intl";
import { useTheme } from "@/context/ThemeContext";

import Button from "@components/ui/Button";

import styles from "./styles";

const ShakeToReportModal = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const themeStyles = styles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={themeStyles.modalContainer}>
        <View style={themeStyles.modalContent}>
          <Text style={themeStyles.modalTitle}>
            <FormattedMessage id="shakeToReport" />
          </Text>
          <Text style={themeStyles.modalText}>
            <FormattedMessage id="shakeToReportMessage" />
          </Text>
          <Button
            variant="contained"
            label={<FormattedMessage id="shakeToReportButton" />}
            onPress={onClose}
            customBoxStyle={themeStyles.ownerButton}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ShakeToReportModal;
