// taken from https://www.thekrazydev.com/how-to-open-a-dropdown-menu-on-hover-in-react/

import {useEffect} from 'react';

/*
    Takes in reference to container for something, and a handler function. This sets up an event listener
    that keeps track of whether the user hovers over ref's container. Once the user stops hovering over the ref's container,
    we call the handler function that was passed in.
*/
export function onHoverOutside(ref: any, handler: (event: any) => void) {
    useEffect(
      () => {
        const listener = (event: any) => {
          if (!ref.current || ref.current.contains(event.target)) {
            // return if reference is not assigned yet?
            return;
          }
          // call once user is not hovering over ref
          handler(event);
        };
        // set up listener when navbar is rendered
        document.addEventListener("mouseover", listener);
        return () => {
            // once user cannot see the menu, stop listening for mouseover
            document.removeEventListener("mouseout", listener);
        };
      },
      [ref, handler]
    );
  }