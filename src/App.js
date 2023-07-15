import "./App.scss";
import Header from "./Header/Header";
import Gallery from "./Home/Gallery";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="App">
      <ChakraProvider>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Header>
        <Gallery searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Gallery>
      </ChakraProvider>
    </div>
  );
}

export default App;
