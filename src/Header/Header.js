import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import "./Header.scss";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="header__box">
      <h1 className="header__title">Madrileños, Archivo fotográfico regional de la CAM</h1>

      <InputGroup className="header__input" marginRight="20px" borderColor="blackAlpha.300" borderRadius="50px" width="200px">
        <InputLeftElement pointerEvents="none">
          <FaSearch color="black" margin="2px 5px" />
        </InputLeftElement>
        <Input placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} textAlign="center" paddingRight="5px" marginRight="20px" fontSize="20px" />
      </InputGroup>
    </div>
  );
};

export default Header;
