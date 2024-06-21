import { render } from "preact";
import { Route, Switch } from "wouter-preact";
import { Header } from "@/components/Header.jsx";
import { Viewport } from "@/components/Viewport.jsx";
import { Home } from "@/pages/Home.jsx";
import { CourseList } from "@/pages/CourseList.jsx";
import { CourseForm } from "@/pages/CourseForm.jsx";
import { StudentsForm } from "@/pages/StudentsForm.jsx";
import { NotFound } from "@/pages/_404.jsx";
import "@/assets/style.css";

export function App () {
	return [
    <Viewport>
    	<Switch>
			  <Route path="/" component={Home} />
			  <Route path="/list" component={CourseList} />
			  <Route path="/edit/:uid" component={CourseForm} />
			  <Route path="/students/:uid" component={StudentsForm} />
		  	<Route default component={NotFound} />
	  	</Switch>
    </Viewport>,
		<Header />
	];
}

render(<App />, document.getElementById("app"));
