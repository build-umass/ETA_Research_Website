import {useState, useRef} from "react"
import { onHoverOutside } from "./hooks/onHoverOutside";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Dropdown placeHolder={"Faculty"} options={["Person A", "Person B", "Person C"]} />
            <Dropdown placeHolder={"Button"} options={[]} />
            <LinkButton buttonText={"Home"} />
        </nav>
    );
}

/*
    Component shows placeholder button, then when the user hovers over it the dropdown menu appears.
    Need input options to not be an empty array
*/
function Dropdown({placeHolder, options}: {placeHolder: string, options: string[]}) {
    if(options.length == 0) {
        throw new Error("Dropdown menu must have at least one option");
    }
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

/*
    Component that will link to specified webpages
*/
function LinkButton({buttonText}) {
    return <button className="navlink">
        <a href="/">{buttonText}</a>
    </button>
}