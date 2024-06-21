import { useState } from "preact/hooks";
import { Link, useParams, useLocation } from "wouter-preact";
import { FormGroup } from "@/components/FormGroup.jsx";
import { Flex } from "@/components/Flex.jsx";
import { ControlWrapper } from "@/components/ControlWrapper.jsx";
import { If } from "@/components/If.jsx";
import { List } from "@/components/List.jsx";
import { Button } from "@/components/Button.jsx";
import { StudentCard } from "@/components/StudentCard.jsx";
import { Title } from "@/components/Title.jsx";
import { Get, Put } from "@/components/Api.jsx";

const EMPTY_FORM = { name: "", email: "" };

export function StudentsForm () {
  const { uid } = useParams();
  const [displayForm, setDisplayForm] = useState(false);
  const toggleCheckDisplay = e => setDisplayForm(e.target.checked);
  const [searchValue, setSearchValue] = useState("");
  const setSearchValueEvt = e => setSearchValue(e.target.value);
  const [formObj, setFormObj] = useState(EMPTY_FORM);
  const updateFormModel = change =>
    setFormObj(outdated => ({ ...outdated, ...change }));
  const [studentList, setStudentList] = useState([]);
  const addStudentToList = () => {
    setStudentList([formObj, ...studentList]);
    setFormObj(EMPTY_FORM);
  }
  const deleteStudent = idx => {
    setStudentList(studentList.filter((a, i) => i !== idx));
  }
  const [location, setCurrentLocation] = useLocation();
  const backCourse = () => setCurrentLocation("/edit/" + uid);
  return (
    <section>
      <Flex justify="space-around">
        <Link to={"/edit/" + uid}>edit course</Link>
      </Flex>
      <Flex direction="row">
        <ControlWrapper>
          <input type="checkbox" checked={displayForm} onClick={toggleCheckDisplay} />
        </ControlWrapper>
        <label>toggle filter / create</label>
      </Flex>
      <If condition={!displayForm} render={() => (
        <ControlWrapper>
          <input value={searchValue} onInput={setSearchValueEvt} placeholder="filter students by name" />
        </ControlWrapper>
      )} />
      <If condition={displayForm} render={() => (
        <FormGroup bind={formObj} watch={updateFormModel}>
          <Flex direction="row" justify="space-between" nthWidth="20%,50%,20%">
            <ControlWrapper>
              <input attr="name" placeholder="Name" />
            </ControlWrapper>
            <ControlWrapper>
              <input attr="email" type="email" placeholder="Email" />
            </ControlWrapper>
            <ControlWrapper>
              <Button text="add" onClick={addStudentToList} />
            </ControlWrapper>
          </Flex>
        </FormGroup>
      )} />
      <ControlWrapper>
        <Put uri={"/students/" + uid} data={studentList} resolve={() => alert("students saved")}>
          <Button text="sync students" />
        </Put>
      </ControlWrapper>
      <hr />
      <Get uri={"/students/" + uid} state={[studentList, (d = []) => setStudentList(d)]} resolve={(data = []) => (
        <List array={searchValue ? data.filter(st =>
          !st.name.search(searchValue)): data} iterate={(student, idx) => (
            <StudentCard { ...student} onRemove={() => deleteStudent(idx)} />
          )} />
      )} />
    </section>
  );
}
