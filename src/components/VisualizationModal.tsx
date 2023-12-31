import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type VisualizationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  imgSrc: string | null;
  title: string;
};
const VisualizationModal = ({
  isOpen,
  onClose,
  header,
  imgSrc,
  title,
}: VisualizationModalProps) => {
  return (
    <>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {imgSrc && (
              <img
                alt={title}
                src={imgSrc}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            )}
          </ModalBody>

          <ModalFooter>
            {imgSrc && (
              <Button
                as={"a"}
                download={`${title}.jpg`}
                href={imgSrc}
                title={title}
                colorScheme="blue"
                mr={3}
              >
                Download
              </Button>
            )}
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VisualizationModal;
