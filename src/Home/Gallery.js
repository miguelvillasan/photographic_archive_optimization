// Gallery.js
import React, { useState, useEffect } from "react";
import { Box, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text } from "@chakra-ui/react";
import { API_URL } from "../constants";

const Gallery = ({ searchTerm, setSearchTerm }) => {
  const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const loadMoreThreshold = 0.8;

  const loadImages = (amount) => {
    setIndex((prevIndex) => prevIndex + amount);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop / (scrollHeight - clientHeight) > loadMoreThreshold) {
      loadImages(50);
    }
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
        setFilteredData(data);
        loadImages(150);
      });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = jsonData.filter((item) => item.subject_access_points.some((point) => point.toLowerCase().includes(searchTerm.toLowerCase())));
      setFilteredData(results);
    } else {
      setFilteredData(jsonData);
    }
  }, [searchTerm, jsonData]);

  return (
    <div>
      <Box display="flex" flexWrap="wrap" justifyContent="center" pt="60px" bgColor="black">
        {filteredData.slice(0, index).map((item, idx) => (
          <Image
            key={idx}
            src={item.digital_object_reference}
            boxSize="200px"
            objectFit="cover"
            m="5px"
            cursor="pointer"
            borderRadius="5px"
            _hover={{ transform: "scale(1.05)" }}
            onClick={() => {
              setModalVisible(true);
              setModalContent({
                src: item.digital_object_reference,
                title: item.title,
                content: item.scope_and_content,
                subjectPoints: item.subject_access_points.join(", "),
                placePoints: item.place_access_points.join(", "),
                creationDate: item.creation_date,
                captions: item.captions,
                tags: item.tags.join(", "),
              });
            }}
            alt={item.title}
          />
        ))}
      </Box>

      {modalVisible && (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalContent.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={modalContent.src} alt={modalContent.title} mb="4" />
              <Text mb="2">{modalContent.content}</Text>
              <Text mb="2">
                <b>Puntos de acceso temáticos: </b>
                {modalContent.subjectPoints}
              </Text>
              <Text mb="2">
                <b>Puntos de acceso geográficos: </b>
                {modalContent.placePoints}
              </Text>
              <Text mb="2">
                <b>Fecha de creación: </b>
                {modalContent.creationDate}
              </Text>
              <Text mb="2">
                <b>Descripción: </b>
                {modalContent.captions}
              </Text>
              <Text mb="2">
                <b>Tags: </b>
                {modalContent.tags}
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
