import { useLocation } from "wouter-preact";
import { Stylesheet } from "@/components/Stylesheet";
import { COLOR } from "@/utils/constants";

const rawCss = `
  :host {
    height: 3rem;
  	display: flex;
  	justify-content: flex-end;
  	background-color: ${COLOR.grey};
  }

  :host nav {
  	display: flex;
  	text-transform: capitalize;
  }

  :host a {
  	color: ${COLOR.green};
  	padding: 0.75rem;
  	text-decoration: none;
    cursor: pointer;
    font-weight: bold;
  }

  :host a.active {
  	background-color: ${COLOR.green};
  	color: white;
  }

  :host a:hover {
  	background-color: white;
  }
`

function ActiveLink ({ text, location }) {
	const [currentLocation, setCurrentLocation] = useLocation();
  return (
    <a onClick={() => setCurrentLocation(location)} class={currentLocation === location && "active"}>
			{text}
		</a>
  )
}

export function Header () {
  return (
    <Stylesheet scoped={rawCss}>
			<nav>
        <ActiveLink text="home" location="/" />
        <ActiveLink text="list" location="/list" />
        <ActiveLink text="new" location="/edit/new" />
			</nav>
    </Stylesheet>
  )
}
