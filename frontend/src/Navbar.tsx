import {useState, useRef} from "react"
import { onHoverOutside } from "./hooks/onHoverOutside";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Dropdown placeHolder={"Faculty"} options={["Person A", "Person B", "Person C"]} />
            <LinkButton buttonText={"Home"} />
        </nav>
    );
}

function Dropdown({placeHolder, options}: {placeHolder: string, options: string[]}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const buttonRef = useRef(null);
    let dropdown = options.map((text, i) => < LinkButton key={i} buttonText={text} />);

    // Function to close dropdown
    const closeHoverMenu = () => {
        setShowDropdown(false);
    };

    onHoverOutside(buttonRef, closeHoverMenu); // Call the hook
    
    return (
        <div ref = {buttonRef}>
            <button className="dropdown-placeholder" onMouseOver={() => setShowDropdown(true)}>
                {placeHolder + " ⌄"}
            </button>
            {showDropdown ? dropdown : null}
        </div>
    );
}

function LinkButton({buttonText}) {
    return <button className="navlink">
        <a href="/">{buttonText}</a>
    </button>
}