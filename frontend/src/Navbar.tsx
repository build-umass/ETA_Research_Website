import {useState, useRef} from "react"

export default function Navbar() {
    return (
        <div className="navbar">
            <LinkButton text={"Home"} link="/" />
            <DropdownButton placeHolder={"Faculty"} options={["Person A", "Person B", "Person C"]} />
            <DropdownButton placeHolder={"Research"} options={["Paper 1", "Paper 2"]} />
        </div>
    );
}

/*
    Component shows placeholder button, then when the user hovers over it the dropdown menu appears.
    Need input options to not be an empty array
*/
function DropdownButton({placeHolder, options}: {placeHolder: string, options: string[]}) {
    const dropdownContent = options.map((text, i) =>
        <LinkButton key={i} text={text} link="/" />
    );
    
    return <div className="dropdown">
        <button className="dropdown-button">{placeHolder + " ⌄"}</button>
        <div className="dropdown-content">
            {dropdownContent}
        </div>
    </div>
}

function LinkButton({text, link}) {
    return <a href={link}>
        <button className="dropdown-button">{text}</button>
    </a>
}