import { Modal, View, Text } from "react-native";
import { FormattedMessage } from "react-intl";

import Button from "@components/ui/Button";

import styles from "./styles";

const ShakeToReportModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            <FormattedMessage id="shakeToReport" />
          </Text>
          <Text style={styles.modalText}>
            <FormattedMessage id="shakeToReportMessage" />
          </Text>
          <Button
            variant="contained"
            label={<FormattedMessage id="shakeToReportButton" />}
            onPress={onClose}
            customBoxStyle={styles.ownerButton}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ShakeToReportModal;
